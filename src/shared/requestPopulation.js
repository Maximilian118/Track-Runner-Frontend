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
    user {
      _id
      name
      email
      icon
    }
    title
    description
    track {
      _id
      name
      country
      location
      logo
      stats
      likes
      geojson {
        _id
        name
        geojson
        stats
      }
    }
    geojson {
      _id
      name
      geojson
      stats
    }
    lap_time
    distance
    runDT
    imgs
    likes
    created_at
    updated_at
  }
  events {
    _id
  }
  tracks {
    _id
    post
    name
    country
    location
    logo
    stats
    geojson {
      _id
      post
      name
      geojson
    }
  }
  rounds {
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
  geojsons {
    _id
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
`

// Post population template literal.
export const populatePost = `
  _id
  user {
    _id
    name
    email
    icon
  }
  title
  description
  geojson {
		_id
		name
		geojson
		stats
	}
  track {
    _id
    name
    country
    location
    logo
    stats
    likes
    geojson {
      _id
      name
      geojson
      stats
    }
  }
  lap_time
  distance
  runDT
  imgs
  likes
  created_at
  updated_at
  tokens
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