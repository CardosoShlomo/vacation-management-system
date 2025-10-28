import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import RequesterView from '../views/RequesterView.vue'
import ValidatorView from '../views/ValidatorView.vue'

describe('App', () => {
  it('renders navigation links', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/requester', component: RequesterView },
        { path: '/validator', component: ValidatorView }
      ]
    })

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('Requester')
    expect(wrapper.text()).toContain('Validator')
  })
})
