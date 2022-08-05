interface IProject {
  name: string
  description: string
  month: string
  year?: number
  href: string
  preview?: string
}

const secrets: IProject[] = [
  {
    name: "The Stillness I felt",
    description: "The stillness I've felt, my debut poetry novel is finally out. I've been working on this for about a year. It has several poems about everything you've felt. From hurting to the healing and from darkness to the light. I hope you like the poems I wrote and yeah.",
    month: "February",
    year: 2022,
    href: "https://www.instagram.com/p/CU1pSD3BHlV/",
    preview: "https://i.imgur.com/1KiYZta.png",
  }
]

export default secrets
