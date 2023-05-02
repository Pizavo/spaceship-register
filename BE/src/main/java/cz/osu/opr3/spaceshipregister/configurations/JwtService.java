package cz.osu.opr3.spaceshipregister.configurations;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Service
public class JwtService {
	@Value("${jwt.signing-key}")
	private String signingKey;
	
	private String getClientIp(HttpServletRequest request) {
		String remoteAddr = "";
		
		if (request != null) {
			remoteAddr = request.getHeader("X-FORWARDED-FOR");
			if (remoteAddr == null || "".equals(remoteAddr)) {
				remoteAddr = request.getRemoteAddr();
			}
		}
		
		return remoteAddr;
	}
	
	public String extractUsername(String token) {
		return this.extractClaim(token, Claims::getSubject);
	}
	
	public String extractIp(String token) {
		return this.extractClaim(token, claims -> claims.get("ip", String.class));
	}
	
	public Date extractExpiration(String token) {
		return this.extractClaim(token, Claims::getExpiration);
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		return claimsResolver.apply(this.extractAllClaims(token));
	}
	
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(this.getSigningKey()).build().parseClaimsJws(token).getBody();
	}
	
	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(signingKey));
	}
	
	public boolean isTokenExpired(String token) {
		return this.extractExpiration(token).before(new Date());
	}
	
	public String generateToken(UserDetails userDetails, HttpServletRequest request) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("ip", this.getClientIp(request));
		
		return this.createToken(userDetails, claims);
	}
	
	private String createToken(UserDetails userDetails, Map<String, Object> claims) {
		return Jwts.builder()
		           .setClaims(claims)
		           .setSubject(userDetails.getUsername())
		           .setIssuedAt(new Date(System.currentTimeMillis()))
		           .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(7)))
		           .signWith(this.getSigningKey(), SignatureAlgorithm.HS512)
		           .compact();
	}
	
	public boolean isTokenValid(String token, UserDetails userDetails, HttpServletRequest request) {
		return (this.extractUsername(token).equals(userDetails.getUsername()) &&
		        this.extractIp(token).equals(this.getClientIp(request)) &&
		        !this.isTokenExpired(token));
	}
}
