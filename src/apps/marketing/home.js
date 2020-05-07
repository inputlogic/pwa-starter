import { Fragment } from 'react'
import { Link } from '@app-elements/router'

import { Hero, ReverseHero } from './hero'

export function Home () {
  return (
    <Fragment>
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

      <div className='alt-bg'>
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
    </Fragment>
  )
}
