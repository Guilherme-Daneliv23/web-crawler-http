const {normalizeURL, getURLsFromHTML} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL strip http', () => {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev/path/"
    const actualNow = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actualNow).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actualNow = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actualNow).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path2/">
                Boot.dev Blog
            </a>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actualNow = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path2/", "https://blog.boot.dev/path1/"]
    expect(actualNow).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actualNow = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actualNow).toEqual(expected)
})