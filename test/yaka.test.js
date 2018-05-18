import Yaka from './../dist/';
import YakaComponents from 'yaka-components';
import { shallow, render, mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import demos from './demos';
const { YakaComponent, YakaForm, YakaFormOnFlow } = Yaka
const { components, layoutComponents } = YakaComponents
configure({ adapter: new Adapter() });
describe('FileUploadInput render', () => {
  it('YakaComponent', () => {
    const conifg = demos[0].config
    function renderedNames(wrapper) {
      return wrapper.find('TableRow').map(row => row.props().record.name);
    }
    const wrapper = mount(
      <YakaComponent
        components={components}
        layoutComponents={layoutComponents}
        config={conifg}
      />
    );
    expect(toJson(wrapper)).not.toBeNull()

  })
})






