
# Hash functions

## General properties of hash functions

A hash function is a type of function that has a particular use in the field of computer science and information security.

## Definition

A hash function $H$ is a process that takes an input value of any length $H(x)$ and returns a fixed-size string of bytes, typically a digest that appears random. The output, called the hash value, should be the same length regardless of the length of the input and should look random. A good hash function also makes it computationally infeasible to regenerate the original input value given the hash value, and to generate two different inputs that produce the same hash value.

## Properties

Hash functions have certain properties that make them useful in cryptography and data integrity verification:

- *Pre-image Resistance*: It should be computationally difficult to reverse engineer the original input value ($x$) given the hash value ($H(x)$).

- *Second Pre-image Resistance: It should be computationally difficult to find a second input ($y$) that produces the same hash value as a given input ($x$) ($H(x) = H(y)$).

- *Collision Resistance*: It should be computationnaly difficult to find two different inputs ($x$ and $y$) that produce the same hash value ($H(x) = H(y)$).

- *Uniform Distribution*: The hash values should be uniformly distributed over the output space, meaning every hash value in the ouput space is equally likely to occur.

- *Avalanche Effect*: A small change in the input should result in a significant change in the output.

- *Deterministic*: The same input should always produce the same output.

## Mathematical Representation

A hash function $H$ can be represented as follows:

$$
H: \{0, 1\}^* \rightarrow \{0, 1\}^n
$$
where ${0, 1}^*$ is the set of all possible inputs (of any length) and ${0, 1}^n$ is the set of all possible outputs (of fixed length $n$).

## Example: Sum of ASCII values

Consider a simple hash function that adds the ASCII values of the characters in a string and returns the sum modulo 256. This hash function is not cryptographically secure, but it is useful for illustrating the properties of hash functions.

$$
H(x) = \sum_{i=0}^{n-1} x_i \mod 256
$$
where $x_i$ is the ASCII value of the $i$th character in the string $x$.

Python implementation:
```python
def hash(x):
	return sum([ord(c) for c in x]) % 256
```

## Keccak-256

Keccak-256 is a cryptographic hash function that is used in the Ethereum blockchain. It is a member of the Keccak family of hash functions, which was selected as the winner of the NIST hash function competition in 2012. It has been chosen as SHA-3, the lastest member of the [Secure Hash Algorithm family](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms) of hash functions.

The implementation of this hash function is notably complex, yet an example of it is available in the core Solidity library on [GitHub](https://github.com/ethereum/solidity/blob/develop/libsolutil/Keccak256.cpp).

## Merkle trees and Merkle Patricia Tree

# Elliptic curve cryptography

## Properties of elliptic curves

## Digital signatures

## Public key cryptography
