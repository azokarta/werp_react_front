import React from 'react'
import { Card,Image,Button,Label,Icon,Message,Popup } from 'semantic-ui-react'
import {MENU_BY_RECO,MENU_BY_DATE,RECO_MODAL_ITEMS} from '../wspaceUtil'

export default function WspaceRecoCard(props){
        const {item,type} = props
        if(!item){
            return (null)
        }
        switch (type){
            case MENU_BY_RECO:
                return renderByReco(props)

            case MENU_BY_DATE:
                return renderByDate(props)

            case RECO_MODAL_ITEMS:
                return renderRecosInModal(props)

            default:
                return (null)
        }

}

function renderRecosInModal(props){
    const {item} = props
    return <Card>
            <Card.Content>
                <Card.Header>
                    {item.clientName}
                </Card.Header>
                <Card.Meta>
                    <Popup style={{float:'left'}}
                           trigger={<Label color={'blue'} size={'small'}>{item.dateTime}</Label>}
                           content="Дата-время перезвона"
                           basic
                    />

                    <span style={{float:'right'}}>{renderCategoryBtn(item.categoryId,item.categoryName)}</span>
                </Card.Meta>
                <Card.Meta>
                    Род: {item.relativeName}
                </Card.Meta>
                <Card.Description>
                        <span style={{fontSize:'11px'}}>
                            {item.note} <a href="#" onClick={() => console.log('Read More...')}>полностью</a>
                    </span>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>

            </Card.Content>
            <Card.Content extra>
                {item.phones.map((p) => renderPhone(p))}
            </Card.Content>
        </Card>
}

function renderByDate(props){
    const {item} = props
    return <Card>
        <Card.Content>
            <Card.Header>
                {item.clientName}
            </Card.Header>
            <Card.Meta>
                {item.recommenderName}
            </Card.Meta>
            <Card.Meta>
                    <Popup style={{float:'left'}}
                        trigger={<Label color={'blue'} size={'small'}>{item.dateTime}</Label>}
                        content="Дата-время перезвона"
                        basic
                    />

                <span style={{float:'right'}}>{renderCategoryBtn(item.categoryId,item.categoryName)}</span>
            </Card.Meta>
            <Card.Description>
                    <span style={{fontSize:'11px'}}>
                        {item.note} <a href="#" onClick={() => console.log('Read More...')}>полностью</a>
                </span>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>

        </Card.Content>
        <Card.Content extra>
            {item.phones.map((p) => renderPhone(p))}
        </Card.Content>
    </Card>
}

function renderByReco(props){
    const {item} = props
    return <Card>
        <Card.Content>
            <Card.Header>
                {item.clientName}
            </Card.Header>
            <Card.Meta>
                <span style={{float:'left'}}>
                    <Popup
                        trigger={<Label>{item.dateTime}</Label>}
                        content="Дата-время демонстрации"
                        basic
                    />
                </span>
                <span style={{float:'right'}}>{renderCategoryBtn(item.categoryId,item.categoryName)}</span>
            </Card.Meta>
            <Card.Description>
                    <span style={{fontSize:'11px'}}>
                    {item.shortAddress}
                </span>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>

        </Card.Content>
        <Card.Content extra>
            {item.phones.map((p) => renderPhone(p))}
        </Card.Content>
        <Card.Content extra>
            <Label>
                <Icon name='users' /> 23
            </Label>

            <Label>
                <Icon name='volume control phone' /> 23
            </Label>

            <Label as={'a'} onClick={() => props.openRecoListModal(item)}>
                <Icon name='unhide' /> Обзвонить
            </Label>

        </Card.Content>
    </Card>
}

function renderPhone(phone){
    return <Label key={phone.id} as='a' horizontal onClick={() => console.log(phone.phoneNumber)}>
        <Icon disabled name='phone' />
        {phone.phoneNumber}
    </Label>
}

function renderCategoryBtn(catId, catName){
    let color = 'grey'
    switch (catId){
        case 1:
            color = 'red'
            break

        case 2:
            color = 'teal'
            break

        case 3:
            color = 'brown'
            break

        default:{}
    }

    return <Button size={'mini'} basic color={color}>{catName}</Button>
}