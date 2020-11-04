import { Fragment } from 'react'
import Carousel from '@app-elements/carousel'
import Helmet from '@app-elements/helmet'
import { Link } from '@app-elements/router'

import { Hero, ReverseHero } from './hero'
import { Testimonial } from './testimonial'
import { Pricing } from './pricing'

import { url } from '/util/url'
import { setState } from '/store'
import { WEB_URL } from '/consts'

const items = ['fff', 'a7c', '09d', '411', '111']

export function Home () {
  return (
    <>

      {/* ___CHANGEME___ */}
      <Helmet
        title='Welcome'
        meta={[
          { name: 'description', content: 'Your life is better with our app.' },
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
            <>
              <h2 className='f1 fweight-400'>Your life is better with our app.</h2>
              <p className='f3'>Seriously, try it out now.</p>

              <div className='button-group'>
                <Link name='signup' className='btn'>Get Started</Link>
                <a href='#features' className='btn btn-ghost'>Learn more</a>
              </div>
            </>
          )}
          media={(
            <img src='https://via.placeholder.com/450/4285F4/FFFFFF?Text=Cool Screenshot' alt='Screenshot of our app in use' width='450' height='450' />
          )}
        />
        <div id='features' className='pt-10'>
          <div className='level'>
            <div className='measure-narrow'>
              <h3>The best feature</h3>
              <p>Really, you've never seen a feature this good. This feature alone is worth signing up for. Our app exists, because of this feature.</p>
            </div>

            <div className='measure-narrow'>
              <h3>Another, great feature</h3>
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
                <>
                  <h2 className='f1 fweight-400'>Your life is better with our app.</h2>
                  <p className='f3'>Seriously, try it out now.</p>

                  <div className='button-group'>
                    <Link name='signup' className='btn'>Get Started</Link>
                    <a href='#features' className='btn btn-ghost'>Learn more</a>
                  </div>
                </>
              )}
              media={(
                <img src='https://via.placeholder.com/450/00D1F7/FFFFFF?Text=Cool Screenshot' alt='Screenshot of our app in use' width='450' height='450' />
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
            <img src='https://via.placeholder.com/350/7F909F/FFFFFF?Text=Cool Screenshot' alt='Screenshot of our app in use' width='450' height='450' />
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
                  avatarSrc={`//www.placehold.it/400x100/${hex}/f44?text=${hex}`}
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
              <button className='btn' onClick={ev => setState({ modal: 'ExampleModal', chosenPlan: 'Yearly' })}>
                Get Started
              </button>
            </Pricing>
            <Pricing
              title='Monthly'
              cost={14}
              perTex='per Month'
              subTitle='No contact, cancel anytime.'
            >
              <button className='btn btn-secondary' onClick={ev => setState({ modal: 'ExampleModal', chosenPlan: 'Monthly' })}>
                Get Started
              </button>
            </Pricing>
          </div>
        </div>
      </div>

    </>
  )
}
