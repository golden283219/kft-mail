import React from 'react'
import { ScrollView, FlatList, View } from 'react-native'
import { MenuItem } from './routeConfig'
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExternalLinkAlt, faLink } from '@fortawesome/free-solid-svg-icons'

class AppLinks extends React.Component {

    render() {
        const { props, activeRouteName, routeNames } = this.props
        var { links } = this.props

        return (
            <FlatList
                data={links.Links}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => <MenuItem
                    title={item["Label"]}
                    icon={faLink}
                    onPress={() => props.navigation.navigate(routeNames.posSystemDetail, { link: item["Link"], title: item["Label"], isBackButtonSupport: (item["BackButton"] == undefined || item["BackButton"] == null) ? false : item["BackButton"] })}
                />}
            >
            </FlatList>
        )
    }
}

export default connect(
    ({ app }) => ({
        isAppLoading: app.isLoading,
        links: app.links,
    })
)(AppLinks);