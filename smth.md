# Multiplicative Cipher Crack

Multiplicative Cipher Crack is a CLI program written in Kotlin that enables its user to crack text encrypted with
the Multiplicative Cipher.

## Table of Contents

1. [Prerequisites](#prerequisites)
    1. [Windows](#windows)
    2. [Linux](#linux)
2. [Installation](#installation)
    1. [Windows](#windows-1)
    2. [Linux](#linux-1)
3. [Usage](#usage)
    1. [Windows](#windows-2)
        1. [PowerShell](#powershell)
        2. [CMD](#cmd)
    2. [Linux](#linux-2)
    3. [Subcommands](#subcommands)
        1. [Crack](#crack)
    4. [Arguments](#arguments)
        1. [Crack](#crack-1)
    5. [Options](#options)
        1. [Crack](#crack-2)
4. [Technical Information](#technical-information)
    1. [Multiplicative Cipher](#multiplicative-cipher)
    2. [Program Operation](#program-operation)
        1. [Crack](#crack-3)
        2. [Language Deduction](#language-deduction)
            1. [Index of coincidence](#index-of-coincidence)
            2. [Frequency analysis](#frequency-analysis)
        3. [Crack Methods](#crack-methods)
            1. [Brute force](#brute-force)
            2. [Frequency analysis](#frequency-analysis-1)
            3. [Dictionary attack](#dictionary-attack)
5. [Example](#example)

## Prerequisites

To run the program, one needs to install JDK (Java Development Kit). The lowest version under which it should run is JDK
17, though installation of the latest LTS version is recommended (as of 2023 JDK 21).

### Windows

The easiest way to install JDK 21 on Windows is to download MSI Installer
found on [Oracle](https://www.oracle.com/java/technologies/downloads/#jdk21-windows) and follow the installation
procedure.

> JDK 17 can be downloaded from the same site, only under different tab.

### Linux

On Linux, one can install JDK 21 the same way as on Windows
(via [Oracle](https://www.oracle.com/java/technologies/downloads/#jdk21-linux)) or via oneself’s package manager.

Though, it would be recommended to install [SDKMAN!](https://sdkman.io/install), which enables oneself to easily install
various
JDK versions and distributions and switch between them fluently, and then install JDK 21 via it.

```shell
$ sdk install java 21-amzn
```

> Provided distribution is Amazon Corretto 21, which is a free and open-source distribution of the Open Java Development
> Kit (OpenJDK).

> To install JDK 17, run:
> ```shell
> $ sdk install java 17.0.8-amzn
>```

> ⚠️ **Warning**: Installing SDKMAN! on Windows is not recommended, as it can be quite complicated and may not work
> properly.

## Installation

The program does not need to be installed. All one has to do is to unpack the archive with the program and run it.

### Windows

To unpack the ZIP archive, one can use any program that supports a ZIP format. The easiest way is to use the built-in.

### Linux

To unpack the TAR archive, one can use any program that supports a TAR format. The easiest way is to use the
built-in.<br>
Or one can do so via the terminal:

```shell
$ tar -xvf multiplicative-cipher-crack.tar
```

## Usage

Once unpacked, one can run the program via the terminal.

### Windows

Open the Terminal in the bin directory or navigate to it via command:

```shell
$ cd path/to/multiplicative-cipher-crack-1.0/bin
```

#### PowerShell

To run the program in PowerShell, run the following command:

```shell
$ & .\multiplicative-cipher-crack.bat
```

#### CMD

To run the program in CMD, run the following command:

```shell
$ .\multiplicative-cipher-crack.bat
```

### Linux

Open the Terminal in the bin directory or navigate to it via command:

```shell
$ cd path/to/multiplicative-cipher-crack-1.0/bin
```

To run the program, run the following command:

```shell
$ ./multiplicative-cipher-crack
```

### Subcommands

The program has one subcommand: `crack`.

#### Crack

To crack text from and to TXT, run the following subcommand (append it to the command
from [Usage](#usage)):

```shell
crack "path/to/input.txt" "path/to/output.txt"
```

### Arguments

#### Crack

| Argument       | Description   |  Input   | Additional Information   |
|----------------|---------------|:--------:|--------------------------|
| `<inputfile>`  | File to crack | `<path>` | must be TXT              |
| `<outputfile>` | Output file   | `<path>` | must be directory or TXT |

### Options

| Option | Long        | Description         | Input  |
|--------|-------------|---------------------|:------:|
|        | `--version` | Print version       | *flag* |
| `-h`   | `--help`    | Prints help message | *flag* |

#### Crack

| Option | Long          | Description                                           |                         Input                          | Additional Information      |
|--------|---------------|-------------------------------------------------------|:------------------------------------------------------:|-----------------------------|
| `-w`   | `--words`     | Whether the cracking should try to split the words    |                         *flag*                         |                             |
| `-l`   | `--language`  | Presumed language of the text                         |                  `(EN\|CZ\|SK\|ALL)`                   | default: ALL                |
| `-d`   | `--deduction` | How the language should be deduced                    |      `(FREQUENCY_ANALYSIS\|INDEX_OF_COINCIDENCE)`      | default: FREQUENCY_ANALYSIS |
| `-m`   | `--method`    | Method used for cracking                              | `(FREQUENCY_ANALYSIS\|BRUTE_FORCE\|DICTIONARY_ATTACK)` | default: BRUTE_FORCE        |
| `-c`   | `--compare`   | Whether the result should be compared to a dictionary |                         *flag*                         |                             |
| `-h`   | `--help`      | Prints help message                                   |                         *flag*                         |                             |

## Technical Information

### Multiplicative Cipher

The program allows for cracking text encrypted with Multiplicative Cipher.

Multiplicative Cipher is a type of substitution cipher, where each letter in the plaintext is mapped to a number
corresponding to its position in the alphabet, and then multiplied by a number (key) and then modulo the alphabet size
to obtain the ciphertext letter.

The formula for encryption is:<br>
$E(x) = (x * k) mod n$<br>
where `x` is the plaintext letter, `k` is the key and `n` is the alphabet size.

The formula for decryption is:<br>
$D(x) = (x * i) mod n$<br>
where `x` is the ciphertext letter, `i` is the multiplicative inverse key and `n` is the alphabet size.

Multiplicative inverse key is a number that multiplied by the key and modulo the alphabet size equals to 1.

### Program Operation

#### Crack

The program receives a path to the input file and reads encrypted text from it.
It is important so that the encrypted text uses single-char letters (characters) only, not multi-char letters (letters).
The reason for that is that it would be necessary to supply new indexes of coincidence and letter frequencies.
Even without such complication, it is hard to obtain correct indexes of coincidence and character frequencies,
especially for non-global languages.

First and foremost, the program tries to correctly identify the language of the original text. This can be achieved by
utilizing two deduction methods

- **Index of coincidence**
    - This method has proven to be less accurate.
- **Frequency analysis**
    - This method has proven to be more accurate, and is the default method.

It is also possible to supply the language manually if it is known to the user or can be presumed.

After correctly identifying the language, the program tries to crack the text using the following methods:

- **Brute force**
    - This method is the least accurate, but provides us with all possible results for the given language.
    - It is the default method.
- **Frequency analysis**
    - This method has proven to be more accurate than the Brute force method, but it could omit the correct result.
    - It is not recommended.
- **Dictionary attack**
    - This method has proven to be the most accurate, but it is the slowest.

If the user wants to compare the result to a dictionary, the program will do so.<br>
Using comparison with the Brute force method is the same as using the Dictionary attack method.

The program can also split the text into words if the user wants to do so.

#### Language Deduction

##### Index of coincidence

As stated in the list above, this method has proven to be less accurate than the Frequency analysis method.

The Index of coincidence is a measure of how similar two texts are. It is calculated by taking the sum of the
multiplication of the frequencies of each character in the text with itself minus one, and then dividing it by the
multiplication of the text length with itself minus one.

The formula for calculating the Index of coincidence is:<br>
$IC = \frac{\sum_{i=1}^{n} f_i(f_i - 1)}{N(N - 1)}$<br>
where `f` is the frequency of the character, `N` is the text length and `n` is the alphabet size.

The index is then compared to the indexes of coincidence of the languages, and the closest candidate is chosen.

##### Frequency analysis

As stated in the list above, this method has proven to be more accurate than the Index of coincidence method.

Frequency analysis is a method of deducing the language of the text by comparing the frequencies of the characters
in the text with the frequencies of the characters in the language.

The formula for calculating the frequency of a character is:<br>
$f = \frac{n}{N}$<br>
where `n` is the number of occurrences of the character and `N` is the text length.

The frequencies are then compared to the frequencies of the characters in the languages, and the candidate with the most
similar frequencies is chosen.

#### Crack Methods

##### Brute force

Brute force is a simple method that iterates over all possible keys and tries to decrypt the text with them.
All possible results are then presented to the user who has to choose the correct one.

##### Frequency analysis

Frequency analysis is the same method as the [one](#frequency-analysis) used for language deduction.
However, instead of searching for the language with the closest frequencies to it,
it searches for the character with the closest frequency to every given character.

The shift between the characters is then calculated and the key is deduced.
All keys are then used to decrypt the text and all possible results are presented to the user who has to choose the
correct one.

##### Dictionary attack

Dictionary attack is the most accurate method, but it is also the slowest.

It utilizes the [Brute force](#brute-force) method under the hood.
However, after its finish it iterates over the results and tries to find such results
that consist more than 50% from words contained in the dictionary that are longer than one character,
and presents the results to the user.

Usually, there is only one result that meets the criteria.

## Example

An example can be found together with encryption/decryption example
at [Google Drive](https://drive.google.com/file/d/1NAGaUO9GPDeCqtCg2J5l5Fvu7UAeqviC/view?usp=drive_link).
