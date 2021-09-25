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
  likes
  posts {
    _id
    title
    description
    img
    created_at
    updated_at
  }
  tracks {
    _id
    user
    post
    name
    country
    location
    logo
    stats
    geojson {
      _id
      user
      post
      name
      geojson
    }
  }
  rounds {
    _id
    user
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
  geojsons {
    _id
    user
    post
    name
    geojson
  }
  following {
    name
    email
    icon
    calendars
    championships
  }
  events {
    _id
  }
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
	geojson {
		_id
		user
		post
		name
		geojson
		stats
	}
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