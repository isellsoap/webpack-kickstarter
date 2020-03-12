// this is the import telling webpack to compile the main CSS file
import '../styles/main.css'

// pollyfills

import 'intersection-observer'
import 'core-js/es/array/from'

// libs

import lozad from 'lozad'

const observer = lozad()
observer.observe()

// components

import { headline } from './components/headline'
headline()
