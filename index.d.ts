import * as OAuth from 'oauth-1.0a'

export declare type WooCommerceRestApiVersion =
  | 'wc/v3'
  | 'wc/v2'
  | 'wc/v1'
  | 'wc-api/v3'
  | 'wc-api/v2'
  | 'wc-api/v1'
export declare type NorsaniVersion =
  | 'v1'
export declare type NorsaniRestApiEncoding = 'utf-8' | 'ascii'
export declare type NorsaniRestApiMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'options'

export interface INorsaniRestApiOptions {
  /* Your Store URL, example: http://woo.dev/ */
  url: string
  /* Your API consumer key */
  consumerKey: string
  /* 	Your API consumer secret */
  consumerSecret: string
  /* Custom WP REST API URL prefix, used to support custom prefixes created with the `rest_url_prefix filter` */
  wpAPIPrefix?: string
  /* WC API version, default is `v3` */
  wCVersion?: WooCommerceRestApiVersion
  /* Norsani API */
  norsaniAPI?: string
  /* Norsani API version, default is `v1` */
  norsaniVersion?: NorsaniVersion
  /* Encoding, default is 'utf-8' */
  encoding?: NorsaniRestApiEncoding
  /* When `true` and using under HTTPS force Basic Authentication as query string, default is `false` */
  queryStringAuth?: boolean
  /* Provide support for URLs with ports, eg: `8080` */
  port?: number
  /* Define the request timeout */
  timeout?: number
  /* Define the custom Axios config, also override this library options */
  axiosConfig?: any
}

export interface INorsaniRestApiQuery {
  [key: string]: string
}

/**
 * Norsani REST API wrapper
 *
 * @param {Object} opt
 */
export default class NorsaniRestApi {
  protected classVersion: string
  protected url: string
  protected consumerKey: string
  protected consumerSecret: string
  protected wpAPIPrefix: string
  protected wCVersion: WooCommerceRestApiVersion
  protected norsaniAPI: string
  protected norsaniVersion: NorsaniVersion
  protected encoding: NorsaniRestApiEncoding
  protected queryStringAuth: boolean
  protected port: number
  protected timeout: number
  protected axiosConfig: any

  /**
   * Class constructor.
   *
   * @param {Object} opt
   */
  constructor(opt: INorsaniRestApiOptions | NorsaniRestApi)

  /**
   * Set default options
   *
   * @param {Object} opt
   */
  private _setDefaultsOptions(opt: INorsaniRestApiOptions): void

  /**
   * Parse params object.
   *
   * @param {Object} params
   * @param {Object} query
   */
  private _parseParamsObject(params: any, query: any): INorsaniRestApiQuery

  /**
   * Normalize query string for oAuth
   *
   * @param  {String} url
   * @param  {Object} params
   *
   * @return {String}
   */
  private _normalizeQueryString(url: string, params: any): string

  /**
   * Get URL
   *
   * @param  {String} endpoint
   * @param  {String} requestapi values could be either wc, norsani, wp
   * @param  {Object} params
   *
   * @return {String}
   */
  private _getUrl(endpoint: string, requestapi: string, params: any): string

  /**
   * Get OAuth
   *
   * @return {Object}
   */
  private _getOAuth(): OAuth

  /**
   * Do requests
   *
   * @param  {String} method
   * @param  {String} endpoint
   * @param  {String} requestapi values could be either wc, norsani, wp
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  private _request(
    method: NorsaniRestApiMethod,
    endpoint: string,
    requestapi: string,
    data: any,
    params: any
  ): Promise<any>

  /**
   * GET requests
   *
   * @param  {String} endpoint
   * @param  {String} requestapi values could be either wc, norsani, wp
   * @param  {Object} params
   *
   * @return {Object}
   */
  public get(endpoint: string, requestapi: string): Promise<any>
  public get(endpoint: string, requestapi: string, params: any): Promise<any>

  /**
   * POST requests
   *
   * @param  {String} endpoint
   * @param  {String} requestapi values could be either wc, norsani, wp
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  public post(endpoint: string, requestapi: string, data: any): Promise<any>
  public post(endpoint: string, requestapi: string, data: any, params: any): Promise<any>

  /**
   * PUT requests
   *
   * @param  {String} endpoint
   * @param  {String} requestapi values could be either wc, norsani, wp
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  public put(endpoint: string, requestapi: string, data: any): Promise<any>
  public put(endpoint: string, requestapi: string, data: any, params: any): Promise<any>

  /**
   * DELETE requests
   *
   * @param  {String} endpoint
   * @param  {String} requestapi values could be either wc, norsani, wp
   * @param  {Object} params
   *
   * @return {Object}
   */
  public delete(endpoint: string, requestapi: string): Promise<any>
  public delete(endpoint: string, requestapi: string, params: any): Promise<any>

  /**
   * OPTIONS requests
   *
   * @param  {String} endpoint
   * @param  {String} requestapi values could be either wc, norsani, wp
   * @param  {Object} params
   *
   * @return {Object}
   */
  public options(endpoint: string, requestapi: string): Promise<any>
  public options(endpoint: string, requestapi: string, params: any): Promise<any>
}

/**
 * Options Exception.
 */
export class OptionsException {
  public name: 'Options Error'
  public message: string

  /**
   * Constructor.
   *
   * @param {String} message
   */
  constructor(message: string)
}
