export default function sortByDate(posts) {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}
