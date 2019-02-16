import React from 'react';
import HeroImage from '../../assets/coding1.svg'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Hero = ({data}) => {
    return (
        <section className="hero" style={{textAlign: "center"}}>
            <div className="hero__image-mobile">
            	<HeroImage className="hero__image"/>
            </div>
            <div className="hero__image-desktop">
                <Img sizes={data.heroImage.sizes}/>
            </div>
            <h1 className="hero__text">Hi, I'm Nero, I'm a Frontend Developer</h1>
        </section>
    );
};

export default props => (
    <StaticQuery
        query={graphql`
            query HeroImageQuery{
                heroImage: imageSharp(fluid:{
                    originalName:{
                        regex: "/hero-header.png/"
                    }
                }){
                    sizes(maxWidth:400){
                        ...GatsbyImageSharpSizes
                    }
                }
            }
        `}
        render={data => <Hero data={data} {...props}/> }
    />
)
