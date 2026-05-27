---
description: 'Generate unit tests for the current file'
agent: 'agent'
tools: ['search', 'read']
---

# Generate Unit Tests

Analyze the code in the active file and generate comprehensive unit tests.

For each public method or function:

1. Write a test for the expected behavior (happy path).
2. Write tests for edge cases and error conditions.
3. Use the Vitest framework.

Output the tests as a complete, runnable test file.
