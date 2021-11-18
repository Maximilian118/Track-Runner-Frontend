export const postStatArr = post => {
  console.log(post)
  let statArr = [
    {
      name: "Distance",
      stat: `${post.distance}km`,
    },
  ]

  post.lap_time && statArr.unshift({
    name: "Best Lap",
    stat: post.lap_time,
  })

  return statArr
}