
import React from 'react'
import Navbar from './'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('Navbar', () => {
  it('should render', () => {
    const wrapper = shallow(<Navbar />)
    expect(wrapper).toBeTruthy()
  })

  it('should handle logout', () => {
    const handleLogout = jest.fn()
    const wrapper = shallow(<Navbar handleLogout={handleLogout} />)
    wrapper.find('a[href="#logout"]').simulate('click')
    expect(handleLogout).toHaveBeenCalled()
  })

  it('should match snapshot', () => {
    const tree = renderer
      .create(<Navbar />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
