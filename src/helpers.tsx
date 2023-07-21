const makeSnakeCase = (words: string | null) => words ? words.replaceAll(' ', '_').toLowerCase() : null

export {makeSnakeCase}