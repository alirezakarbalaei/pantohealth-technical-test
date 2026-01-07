type ApiPath = Record<
  string,
  {
    key: string
    path: string
  }
>

export const QUERIES: ApiPath = {
  stations: {
    key: 'STATIONS',
    path: 'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw'
  }
}