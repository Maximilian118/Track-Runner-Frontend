const userFields = `
  {
    _id
    name
    email
    icon
    calendars
    championships
    coords
    created_at
  }
`

const geojsonFields = `
  {
    _id
    name
    geojson
    stats
  }
`

const trackFields = `
  {
    _id
    name
    country
    location
    logo
    stats
    likes
    geojson ${geojsonFields}
  }
`

// Comment population template literal.
export const commentFields = `
  {
    _id
    user ${userFields}
    likes
    comment
    created_at
    tokens
  }
`

const postFields = `
  {
    _id
    title
    description
    lap_time
    distance
    runDT
    imgs
    likes
    created_at
    updated_at
    user ${userFields}
    track ${trackFields}
    geojson ${geojsonFields}
    comments ${commentFields}
  }
`

const eventFields = `
  {
    _id
  }
`

const roundFields = `
  {
    _id
    calendars
    year
    championship
    round
    track
    confirmed
    from
    to
    sessions
    likes
  }
`

// User population template literal.
export const populateUser = `
  _id
  tokens
  name
  email
  icon
  profile_picture
  calendars
  championships
  coords
  likes
  posts ${postFields}
  events ${eventFields}
  tracks ${trackFields}
  rounds ${roundFields}
  geojsons ${geojsonFields}
  following ${userFields}
`

// Post population template literal.
export const populatePost = `
  _id
  title
  description
  lap_time
  distance
  runDT
  imgs
  likes
  created_at
  updated_at
  tokens
  user ${userFields}
  geojson ${geojsonFields}
  track ${trackFields}
  comments ${commentFields}
`

// Track population template literal.
export const populateTrack = `
	_id
	name
	country
	location
	logo
	stats
	likes
	tokens
	geojson ${geojsonFields}
`

// Geojson population template literal.
export const populateGeojson = `
  _id
  user
  post
  name
  geojson
  stats
  tokens
`

// Like population template literal.
export const populateLike = `
  object_type
  object_id
  old_likes
  old_likes_length
  new_likes
  new_likes_length
  tokens
`

// Comment population template literal.
export const populateComment = `
  _id
  user ${userFields}
  likes
  comment
  created_at
  tokens
`