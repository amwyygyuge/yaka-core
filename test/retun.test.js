import Yaka from './../dist/';
import YakaComponents from 'yaka-components';
import { Button, InputNumber, Card, Checkbox, Input } from 'igroot'
import { shallow, render, mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { readdir } from './tool';
const fs = require('fs')
const path = require('path')
const { YakaComponent, YakaForm, YakaFormOnFlow } = Yaka
const { components, layoutComponents } = YakaComponents
const oldComponents = {
    ...components,
    Checkbox: Checkbox.Group,
    Button,
    Input,
    InputNumber,
    Card,
    TextArea: Input.TextArea,
}

configure({ adapter: new Adapter() });


const list = readdir(path.join(__dirname, 'error_case'), {
    rex: /.json/
})
if (list.length === 0) {
    describe('error test', () => {
        it('noe error case', () => {
            expect(true).toBe(true)
        })
    })
} else {
    describe('error test', () => {
        list.forEach(item => {
            const name = item.split('/').splice(-1, 1)[0]
            it(name, () => {
                const config = fs.readFileSync(item, "utf-8")
                const wrapper = mount(
                    <YakaFormOnFlow
                        components={oldComponents}
                        layoutComponents={layoutComponents}
                        config={JSON.parse(config)}
                    />
                )
                expect(toJson(wrapper))
            })
        })

    })
}
