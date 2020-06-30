import { StackRouter, RouteTo } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import { CSSTransition, SwitchTransition } from "react-transition-group"

import { asyncComponent } from '/elements/async-component'
import { url } from '/util/url'
import { getState } from '/store'

export const routes = {
  app: {
    path: url('app'),
    component: asyncComponent(() => import('./users').then(m => m.Users))
  },
  users: {
    path: url('users'),
    component: asyncComponent(() => import('./users').then(m => m.Users))
  },
  user: {
    path: url('user'),
    component: asyncComponent(() => import('./user').then(m => m.User))
  }
}

export function MainApp () {
  const { token, currentPath } = getState()
  if (token == null) {
    showNotification({ message: 'Please login to view that page.' })
    return <RouteTo name='login' queries={{ next: currentPath }} />
  }
  return (
    <div id='main-layout'>
      {/*
        We are going to use a StackRouter so we can wrap our route
        components with components from ReactTransitionGroup.
        StackRouter maintains a stack (much like window.history)
        of the routes that have been rendered.

        The current active route is always the last in the `stack`
        array. In this case, we are going to limit the stack to only
        hold 1 route, and just utilize the function as child pattern,
        so we can wrap the route component with a SwitchTransition.
      */}
      <StackRouter routes={routes}>
        {({ stack, limit = 1 }) => {
          const { path, args, Component } = stack[stack.length - 1]
          console.log({ stack })
          return (
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={path}
                classNames="fade"
                addEndListener={(node, done) => {
                  node.addEventListener("transitionend", done, false)
                }}
              >
                <div className='page'>
                  <Component {...args} />
                </div>
              </CSSTransition>
            </SwitchTransition>
          )
        }}
      </StackRouter>
    </div>
  )
}
