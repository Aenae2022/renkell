import { expect, test } from 'vitest'
import validateToken from './validateToken'

test('validates a correct token : abc123def456', () => {
  expect(validateToken('abc123def456', 12)).toBe(true)
})

test('rejects an invalid token : invalid', () => {
  expect(validateToken('invalid', 12)).toBe(false)
})

test('rejects an invalid token : ab-123def456', () => {
  expect(validateToken('ab-123def456', 12)).toBe(false)
})

test('rejects an invalid token : undefined', () => {
  expect(validateToken(undefined, 12)).toBe(false)
})

test('rejects an invalid token : ""', () => {
  expect(validateToken('', 12)).toBe(false)
})

test('validates a correct token : abc123de', () => {
  expect(validateToken('abc123de', 8)).toBe(true)
})

test('rejects an invalid token : abc123de', () => {
  expect(validateToken('abc123de', 12)).toBe(false)
})

test('nb caracter valid : 5', () => {
  expect(validateToken('abc12', 5)).toBe(true)
})

test('nb caracter valid : 50', () => {
  expect(validateToken('abc12abc12abc12abc12abc12abc12abc12abc12abc12abc12', 50)).toBe(true)
})

test('nb caracter invalid : 4', () => {
  expect(validateToken('abc1', 4)).toBe(false)
})

test('nb caracter invalid : 51', () => {
  expect(validateToken('abc12abc12abc12abc12abc12abc12abc12abc12abc12abc12a', 51)).toBe(false)
})

test('nb caracter invalid : 2.5', () => {
  expect(validateToken('ab', 2.5)).toBe(false)
})

test('nb caracter valid : 15', () => {
  expect(validateToken('abc12abc12abc12', 15)).toBe(true)
})

test('nb caracter invalid : 15.5', () => {
  expect(validateToken('abc12abc12abc12', 15.5)).toBe(false)
})

test('nb caracter invalid : Nan', () => {
  expect(validateToken('abc12abc12abc12', NaN)).toBe(false)
})

test('nb caracter invalid : infinity', () => {
  expect(validateToken('abc12abc12abc12', Infinity)).toBe(false)
})