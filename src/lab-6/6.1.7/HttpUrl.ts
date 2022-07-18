import {UrlParsingError} from './UrlParsingError'

export enum Protocol {
    'HTTP' = 'http',
    'HTTPS' = 'https',
}

const PORT = {
    INIT: {
        HTTP_DEFAULT: 80,
        HTTPS_DEFAULT: 443
    },
    MAX_VALUE: 65536,
    MIN_VALUE: 1
}

const MESSAGES = {
    PORT: {
        ERROR: 'Port error'
    },
    URL: {
        ERROR: 'Url error'
    },
    PROTOCOL: {
        ERROR: 'Protocol error'
    },
    DOMAIN: {
        ERROR: 'Domain error'
    },
    DOCUMENT: {
        ERROR: 'Document error'
    }
}

export class HttpUrl {
    private readonly domain: string
    private readonly document: string
    private readonly port: number
    private readonly protocol: Protocol

    constructor(url: string) {
        if (!HttpUrl.isCorrectUrlCharacter(url)) {
            throw new UrlParsingError(MESSAGES.URL.ERROR)
        }
        const urlMap: Map<string, string> = HttpUrl.getUrlMap(url)
        this.protocol = HttpUrl.convertStringToProtocol(urlMap.get('protocol'))
        this.domain = HttpUrl.getCorrectDomain(urlMap.get('domain'))
        this.port = this.getCorrectPort(urlMap.get('port'))
        this.document = HttpUrl.getCorrectDocument(urlMap.get('document'))
    }

    private static convertStringToProtocol(protocol: string | undefined): Protocol {
        if (protocol?.toLowerCase() === Protocol.HTTPS) {
            return Protocol.HTTPS
        } else if (protocol?.toLowerCase() === Protocol.HTTP) {
            return Protocol.HTTP
        } else {
            throw new UrlParsingError(MESSAGES.PROTOCOL.ERROR)
        }
    }

    private static getUrlMap(url: string): Map<string, string> {
        const urlMap: Map<string, string> = new Map()
        const protocolRegexp = /^(\D+):\/\//;
        if (!protocolRegexp.test(url))
        {
            throw new UrlParsingError(MESSAGES.PROTOCOL.ERROR)
        }
        const extractedProtocol: string[] = url.split('://', 2)
        urlMap.set('protocol', extractedProtocol[0])
        const extractedDomainAndPort: string[] = extractedProtocol[1].split('/')
        const extractedDomain: string[] = extractedDomainAndPort[0].split(':', 2)
        urlMap.set('domain', extractedDomain[0])
        urlMap.set('port', extractedDomain[1])
        const extractedDocument = extractedDomainAndPort
        extractedDocument.shift()
        const document = extractedDocument.join('/')
        urlMap.set('document', document)

        return urlMap
    }

    private static getCorrectDomain(domain: string | undefined): string {
        if (!domain || !HttpUrl.isCorrectDomain(domain)) {
            throw new UrlParsingError(MESSAGES.DOCUMENT.ERROR)
        }

        return domain
    }

    private static getCorrectDocument(document: string | undefined): string {
        if (!document) {
            document = '/'
        }

        if (document[0] !== '/') {
            document = `/${document}`
        }

        if (document && !HttpUrl.isCorrectDocument(document)) {
            throw new UrlParsingError(MESSAGES.DOCUMENT.ERROR)
        }

        return document
    }

    private static isCorrectDocument(domain: string): boolean {
        return !Boolean(domain.match(/[^\da-zA-Z-._!~*'()/?=:]/))
    }

    private static isCorrectDomain(domain: string): boolean {
        return !Boolean(domain.match(/[^\da-zA-Z\-.]/))
    }

    private static isCorrectPort(portAsString: string): boolean {
        if (portAsString.match(/D/)) {
            return false
        }

        const portByNumber: number = parseInt(portAsString, 10)
        return portByNumber <= PORT.MAX_VALUE && portByNumber >= PORT.MIN_VALUE
    }

    private static isCorrectUrlCharacter(url: string): boolean {
        if (!url) {
            return false
        }

        return !Boolean(url.match(/[^\da-zA-Z-.:_!~*'()/?&=]/))
    }

    public getDocument(): string {
        return this.document
    }

    public getDomain(): string {
        return this.domain
    }

    public getPort(): number {
        return this.port
    }

    public getProtocol(): string {
        return this.protocol
    }

    public getUrl(): string {
        let portAsString = ''
        const separator = '://'
        if (this.protocol === Protocol.HTTP && this.port !== PORT.INIT.HTTP_DEFAULT) {
            portAsString = `:${this.port}`
        }

        if (this.protocol === Protocol.HTTPS && this.port !== PORT.INIT.HTTPS_DEFAULT) {
            portAsString = `:${this.port}`
        }
        return `${this.protocol}${separator}${this.domain}${portAsString}${this.document}`
    }

    private getDefaultPort(): number {
        if (this.protocol === Protocol.HTTPS) {
            return PORT.INIT.HTTPS_DEFAULT
        }

        return PORT.INIT.HTTP_DEFAULT
    }

    private getCorrectPort(port: string | undefined): number {
        if (!port) {
            return this.getDefaultPort()
        }

        if (!HttpUrl.isCorrectPort(port)) {
            throw new UrlParsingError(MESSAGES.PORT.ERROR)
        }

        return parseInt(port, 10)
    }
}