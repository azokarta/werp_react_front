import React,{Component} from 'react'
import { Table,Icon,Label,Button,Message } from 'semantic-ui-react'
import _ from 'lodash'
import {RECO_CATEGORIES,RECO_CATEGORY_COLORS} from './crmUtil'


// Результат неизвестно
const DEMO_RESULT_UNKNOWN = 0;

// Демо пройден
const DEMO_RESULT_DONE = 1;

// демо перенесен
const DEMO_RESULT_MOVED = 2;

// демо отменена
const DEMO_RESULT_CANCELLED = 3;

// Продан
const DEMO_RESULT_SOLD = 4;

// Мини договор
const DEMO_RESULT_MINI_CONTRACT = 5;

// Продан, но потом отменен
const DEMO_RESULT_SOLD_CANCELLED = 6;

export function renderRecoCategoryBtn(categoryId){
    let category = _.find(RECO_CATEGORIES,{'key': categoryId})

    return <Button
        size='tiny'
        basic color={RECO_CATEGORY_COLORS[categoryId] || 'grey'}>
        {(category && category['text'])?category && category['text']:'Неизвестно'}
    </Button>
}

export function renderRecoCategoryAsQty(categoryId,qty){
    let category = _.find(RECO_CATEGORIES,{'key': categoryId})
    let title = category && category.text ? category.text : 'Неизвестно'
    return <Label basic title={title}
                  key={categoryId}
                  color={RECO_CATEGORY_COLORS[categoryId]}>
        {qty}
    </Label>
}

export function renderDemoResultLabel(resultId,resultName){
    let color = '';
    switch (resultId){
        case DEMO_RESULT_UNKNOWN:
            color = 'grey';
            break

        case DEMO_RESULT_DONE:
            color = 'blue';
            break;

        case DEMO_RESULT_MOVED:
            color = 'orange';
            break;

        case DEMO_RESULT_CANCELLED:
        case DEMO_RESULT_SOLD_CANCELLED:
            color = 'yellow';
            break;

        case DEMO_RESULT_SOLD:
            color = 'green';
            break;

        case DEMO_RESULT_MINI_CONTRACT:
            color = 'teal';
            break;

        default:
            color = 'grey';
    }

    return <Label color={color} horizontal>{resultName}</Label>;
}