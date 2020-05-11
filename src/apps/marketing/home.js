import { Fragment } from 'react'

import Carousel from '@app-elements/carousel'
import Image from '@app-elements/image'
import { Link } from '@app-elements/router'

import { Hero, ReverseHero } from './hero'

const items = ['fff', 'a7c', '09d', '411', '111']

export function Home () {
  return (
    <Fragment>

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

            <Carousel withDots>
              {items.map(hex => (
                <Image
                  src={`http://www.placehold.it/400x100/${hex}/f44?text=${hex}`}
                  unloadedSrc={`http://www.placehold.it/400x300/eee/eee?text=Loading`}
                  style='width: 100%'
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>

    </Fragment>
  )
}
