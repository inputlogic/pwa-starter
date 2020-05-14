import { Fragment } from 'react'

import Carousel from '@app-elements/carousel'
import Helmet from '@app-elements/helmet'
import { Link } from '@app-elements/router'

import { Hero, ReverseHero } from './hero'
import { Testimonial } from './testimonial'
import { Pricing } from './pricing'

import url from '/util/url'
import { WEB_URL } from '/consts'

const items = ['fff', 'a7c', '09d', '411', '111']

export function Home () {
  return (
    <Fragment>

      {/* ___CHANGEME___ */}
      <Helmet
        title='Welcome'
        meta={[
          { property: 'og:title', content: 'PWA Starter | Welcome' },
          { property: 'og:site_name', content: 'PWA Starter, Inc.' },
          { property: 'og:description', content: 'PWA Starter is your starting point for your next Preact app.' },
          // { property: 'og:image', content: 'https://www.fulldomain.com/images/image-1.jpg' },
          // { property: 'twitter:image:alt', content: 'Alt text for image' },
          { property: 'og:url', content: `${WEB_URL}${url('home')}` },
          { property: 'twitter:card', content: 'summary_large_image' }
          // { property: 'fb:app_id', content: 'your_app_id' },
          // { property: 'twitter:site', content: '@twitter-handle' }
        ]}
      />

      {/* Primary Hero and Features */}
      <div className='container'>
        <Hero
          text={(
            <Fragment>
              <h2 className='f1 fweight-400'>Your life is better with our app.</h2>
              <p className='f3'>Seriously, try it out now.</p>

              <div className='button-group'>
                <Link name='signup' className='btn'>Get Started</Link>
                <a href='#features' className='btn btn-ghost'>Learn more</a>
              </div>
            </Fragment>
          )}
          media={(
            <img src='https://via.placeholder.com/450/4285F4/FFFFFF?Text=Cool Screenshot' alt='Screenshot of our app in use' />
          )}
        />
        <div id='features' className='pt-10'>
          <div className='level'>
            <div className='measure-narrow'>
              <h3>The best feature</h3>
              <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
            </div>

            <div className='measure-narrow'>
              <h3>Another, neato feature</h3>
              <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
            </div>

            <div className='measure-narrow'>
              <h3>Just okay feature</h3>
              <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Hero */}
      <div className='bg-off-white'>
        <div className='container'>
          <div className='mt-4 pt-8 pb-10'>
            <ReverseHero
              measure='measure-wide'
              text={(
                <Fragment>
                  <h2 className='f1 fweight-400'>Your life is better with our app.</h2>
                  <p className='f3'>Seriously, try it out now.</p>

                  <div className='button-group'>
                    <Link name='signup' className='btn'>Get Started</Link>
                    <a href='#features' className='btn btn-ghost'>Learn more</a>
                  </div>
                </Fragment>
              )}
              media={(
                <img src='https://via.placeholder.com/450/00D1F7/FFFFFF?Text=Cool Screenshot' alt='Screenshot of our app in use' />
              )}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className='container pt-8 mt-2 mb-8'>
        <Hero
          measure=''
          text={(
            <div className='pt-1 grid-2'>
              <div className='measure-narrow'>
                <h3>Another, neato feature</h3>
                <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
              </div>
              <div className='measure-narrow'>
                <h3>Another, neato feature</h3>
                <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
              </div>
              <div className='measure-narrow'>
                <h3>Another, neato feature</h3>
                <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
              </div>
              <div className='measure-narrow'>
                <h3>Another, neato feature</h3>
                <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
              </div>
            </div>
          )}
          media={(
            <img src='https://via.placeholder.com/350/7F909F/FFFFFF?Text=Cool Screenshot' alt='Screenshot of our app in use' />
          )}
        />
      </div>

      {/* Testimonials */}
      <div className='bg-alt'>
        <div className='container'>
          <div className='mt-4 pt-8 pb-10'>
            <h1 className='tc tertiary-color'>Don't just take our word for it.</h1>

            <Carousel withDots noNav wrapperClass='testimonials'>
              {items.map(hex => (
                <Testimonial
                  avatarSrc={`http://www.placehold.it/400x100/${hex}/f44?text=${hex}`}
                  quote={`It's new. It's out of the ordinary. It's rather extrordinary, so yo bust this commentary. Garrulous, Chicanery, recalcitrant, Eudaimonic, promulgating, Loquacious, ecumenical.`}
                  attribution='Fresh Prince'
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className='bg-off-white'>
        <div className='container pt-10 pb-10'>
          <h1 className='tc tertiary-color'>Pricing you can understand.</h1>

          <div className='grid-3'>
            <Pricing
              title='Free Trial'
              cost='14 days'
              subTitle='Try the 14 day free trial to see if our product is for you.'
            >
              <Link name='signup' className='btn btn-ghost'>Start Free Trial</Link>
            </Pricing>
            <Pricing
              primary
              title='Yearly'
              cost={9}
              perTex='per Month'
              subTitle='Pay yearly for a wicked discount!'
            >
              <Link name='signup' className='btn btn-secondary btn-stretchy'>Get Started</Link>
            </Pricing>
            <Pricing
              title='Monthly'
              cost={14}
              perTex='per Month'
              subTitle='No contact, cancel anytime.'
            >
              <Link name='signup' className='btn btn-secondary'>Sign Up</Link>
            </Pricing>
          </div>
        </div>
      </div>

    </Fragment>
  )
}
