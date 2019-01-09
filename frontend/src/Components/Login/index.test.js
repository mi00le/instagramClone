import React from 'react'
import Login from './'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('Login', () => {
  it('should render', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper).toBeTruthy()
  })

  it('should handle login', () => {
    const login = jest.fn()
    Login.prototype.login = login;
    const wrapper = shallow(<Login />)
    wrapper.find('form').simulate('submit')
    expect(login).toHaveBeenCalled();
  })

  it('should match snapshot', () => {
    const tree = renderer
      .create(<Login />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
