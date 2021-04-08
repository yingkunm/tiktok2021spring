import React, { Component } from 'react'

import Slide from '../component/Slide'

import banner1 from './pic1.png'
import banner2 from './pic2.png'
import banner3 from './pic3.png'

const opts = [{
	link: 'javascript:;',
	src: banner1
},{
	src: banner2
},{
	link: '#',
	src: banner3
}]

class Home extends Component {
	render() {
		return (
			<Slide opts={opts} />
		)
	}
}

export default Home;