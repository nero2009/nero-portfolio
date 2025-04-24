---
path: /generating-pdf-react-pdf
date: 2019-07-24
title: Generating Pdf documents in React Using React-pdf
author: Oghenero Adaware
description: So in the tutorial, I will try to explain briefly how react-pdf works and also walk you through how to generate PDf from an array of objects
---

### Introduction

I was working on a project recently and I got a unique(for me) requirement that needed me to generate pdf file from an array of values in the Browser, usually in my little experience in software development Pdf files are generated in the backend using [Puppeteer](https://github.com/GoogleChrome/puppeteer) for node js and [FPDF](http://www.fpdf.org/) for PHP e.t.c. So I had to look for a React library that could work for my use case, lucky for me I found [React-pdf](https://react-pdf.org/). I found other libraries like [@progress/kendo-react-pdf](https://www.npmjs.com/package/@progress/kendo-react-pdf) but I decided to go with [React-pdf](https://react-pdf.org/) because of its developer-friendly documentation.
The library was built by [Diego Muracciole](https://github.com/diegomura) and also maintained by him.
So in the tutorial/ blog post, I will try to explain briefly how react-pdf works and also walk you through how to generate PDf from an array of objects coming from the [Moviedb Api](https://developers.themoviedb.org/3).

### Features

While going through the documentation when I was trying to pick the appropriate library for my use-case there were some features of [React-pdf](https://react-pdf.org/) that convinced me to use it, I will briefly talk about them:

##### Components

React-Pdf uses [React-Primitives](https://github.com/lelandrichardson/react-primitives) spec to create custom components that you can use to create and structure your PDF documents.
These components include:

+ Document
- Page
- View
- Image
- Text
- Link
- Note
- Canvas
- PDFViewer
- PDFDownloadLink
- BlobProvider

You can checkout the docs for more details on what each component above does, Basically the components about help you create pdf using JSXesques syntax.

##### Styling

Now that we have an idea of how to create the PDF document how do we style it? [React-pdf](https://react-pdf.org/) provides powerful styling solution using the StyleSheet API which helps you style your document using CSS, Media queries and Flexbox. Check the docs for the CSS properties they support.
What if you are a big fan of CSS-in-JS? well, they also support the entire [styled-components](https://www.styled-components.com) API.

##### Fonts

React-Pdf has a `Font` API that helps you load fonts from different sources and use in your PDF document.

Those were some of the features that made me pick React-pdf. Also when I checked the [Github Repository](https://github.com/diegomura/react-pdf) the maintainer [Diego Muracciole](https://github.com/diegomura) is quite active and tries to respond to most issues opened.

### Demo

So I will briefly work you through a simple example of generating pdf from the MoviesDB API. This demo is going to demonstrate generating the best movies of the year.

#### Folder Structure

```json
project
│   package.json
│
│
└───Public
│   │   150.png
│   │   index.html
│   │   star.png
│
│
│
└───src
    │   Movie.jsx
    │   MovieList.jsx
    |   constant.js
    |   index.js
    |   styles.css
```

index.js(entry)

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import MovieList from './MovieList'

import './styles.css'

function App() {
  return (
    <div className="App">
      <MovieList />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

The index.js is the entry point of the application. It renders the `<MovieList/>` which is the parent component of our application.

MovieList.jsx

```javascript
import React, { useState } from 'react'
import Axios from 'axios'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { API_KEY } from './constants'
import { PdfDocument } from './Movie'

const years = [
  { value: '2010', text: '2010' },
  { value: '2011', text: '2011' },
  { value: '2012', text: '2012' },
  { value: '2013', text: '2013' },
  { value: '2014', text: '2014' },
  { value: '2015', text: '2015' },
  { value: '2016', text: '2016' },
  { value: '2017', text: '2017' },
  { value: '2018', text: '2018' },
  { value: '2019', text: '2019' },
]

export default function MovieList() {
  const [year, setYear] = useState('')
  const [movieDetails, setDetails] = useState([])
  const [show, setHide] = useState(false)

  const fetchMovie = async e => {
    setYear(e.target.value)
    try {
      let res = await Axios(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_year=${year}&sort_by=vote_average.desc`
      )
      setDetails(res.data.results)
      setHide(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h2>Best movies of the year</h2>
      <label htmlFor="movies">Select Year</label>
      <select id="movies" className="select" onChange={fetchMovie}>
        <option defaultValue="" disabled>
          Select your option
        </option>
        {years.map((year, index) => {
          return (
            <option key={index} value={year.value}>
              {year.text}
            </option>
          )
        })}
      </select>
      {show && (
        <PDFDownloadLink
          document={<PdfDocument data={movieDetails} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download Pdf'
          }
        </PDFDownloadLink>
      )}
    </div>
  )
}
```

The `MovieList.jsx` component contains most of the logic in this application. we import `PDFDownloadLink` from `@react-pdf/renderer`, this is basically an anchor tag that enables us to generate and download PDF documents. `PDFDownloadLink` accepts a `document` props which are the PDF template we will be creating soon using some of the React-primitives listed early in this post. It also accepts a `filename` prop that can be used to define the filename of the PDF document, a `style` prop to add inline styling to the link tag, a `className` prop if you prefer using classes to style and `children` prop which is the anchor tag contents.

Movie.jsx

```javascript
import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import moment from 'moment'

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  movieContainer: {
    backgroundColor: '#f6f6f5',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  movieDetails: {
    display: 'flex',
    marginLeft: 5,
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 10,
  },

  image: {
    height: 200,
    width: 150,
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
    marginBottom: 12,
  },
  vote: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    height: 10,
    width: 10,
  },
  vote_text: {
    fontSize: 10,
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: '#61C74F',
    color: '#fff',
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4,
  },
  overviewContainer: {
    minHeight: 110,
  },
  detailsFooter: {
    display: 'flex',
    flexDirection: 'row',
  },
  lang: {
    fontSize: 8,
    fontWeight: 700,
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: 'bold',
  },
})

export function PdfDocument(props) {
  console.log('pdf props', props.data)
  return (
    <Document>
      <Page style={styles.page}>
        {props.data
          ? props.data.map((a, index) => {
              return (
                <View key={index} style={styles.movieContainer}>
                  <Image
                    style={styles.image}
                    source={
                      a.poster_path !== null
                        ? `${POSTER_PATH}${a.poster_path}`
                        : '150.jpg'
                    }
                  />
                  <View style={styles.movieDetails}>
                    <Text style={styles.movieTitle}>{a.title}</Text>
                    <View style={styles.subtitle}>
                      <View style={styles.vote}>
                        <Image source="star.png" style={styles.rating} />
                        <Text style={styles.vote_text}>{a.vote_count}</Text>
                      </View>
                      <View style={styles.vote}>
                        <Text style={styles.vote_pop}>{a.popularity}</Text>
                        <Text style={styles.vote_pop_text}>Popularity</Text>
                      </View>
                    </View>
                    <View style={styles.overviewContainer}>
                      <Text style={styles.movieOverview}>{a.overview}</Text>
                    </View>
                    <View style={styles.detailsFooter}>
                      <Text style={styles.lang}>
                        Language: {a.original_language.toUpperCase()}
                      </Text>
                      <Text style={styles.vote_average}>
                        Average Votes: {a.vote_average}
                      </Text>
                      <Text style={styles.vote_average}>
                        Release Date:{' '}
                        {moment(a.release_date, 'YYYY-MM-DD').format(
                          ' MMMM D Y'
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          : ''}
      </Page>
    </Document>
  )
}
```

This `Movie.jsx` component is the template of the PDF we are generating, Here we define how the structure of the PDF using React-primitives(VIEW, DOCUMENT) and also style. So I'd briefly talk about the some of React-pdf API's I used here.

- `StyleSheet.create()` : It helps you define the styles you want to use in the document, It accepts an object containing all the CSS you want to use in the Document and it returns an object which you can apply to any of the PDF elements via the `style` prop.

- `Document` : The `PDFDownloadLink` `document` prop accepts only a component of type `Document` so this must be the root of your components when creating the PDF template and accepts only child of type `Page`, The `Document` is simply a wrapper around your PDF template and it accepts some optional [props](https://react-pdf.org/components#document)

- `Page` : This indicates a Page in the document and you can have multiple `Pages` in a document. It accepts some props to define the `size` of the page, `orientation` or if you want page wrapping `wrap`. [props](https://react-pdf.org/components#page)

- `View` : I will like to compare this component to the HTML `div`, it helps you section or divide the document. [props](https://react-pdf.org/components#view)

- `Text` : This component is used for displaying text on the document and applying styles to it. [props](https://react-pdf.org/components#text)

- `Image` : This component is used for displaying images(network or local) on the document, these images could be PNG, JPG or base64.

### Demo Application

https://codesandbox.io/s/react-pdf-demo-i1ted?view=split

## Conclusion

Before I used this library I never thought it was possible to generate PDF on the client-side, Not only does react-pdf allow you do that but get to use JSXesque syntax to structure and design the PDF document. I know the demo is quite trivial but I think this library might be useful in some use cases.
