import React from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import { scale, scaleByVertical } from ':global/layout';

import colors from ':global/colors';
import images from ':global/images';
import { links } from 'react-native-firebase';

class PosLinkSystemScreen extends React.Component{

    onGoDetail = (link) => {
        this.props.navigation.push("sop_document_detail", {link: link})
    }

    render(){
        const { links } = this.props

        return(
            <View style={{flex: 1}}>
                <FlatList
                    data={links["SOP_Link"]}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item, index}) => <SopLinkItem 
                        index={index}
                        link={item}
                        onClick={(link) => this.onGoDetail(link)}
                    />}
                >
                </FlatList>
            </View>
        )
    }
}

class SopLinkItem extends React.Component{
    render(){
        const {index, link} = this.props
        return(
            <View style={{alignItems: 'center', paddingHorizontal: 15, marginTop: 10}}>
                <TouchableOpacity style={styles.container} onPress={() => this.props.onClick(link)}>
                    <Text>Document {index + 1}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: scaleByVertical( 14 ),
      borderRadius: scaleByVertical( 5),
      backgroundColor: colors.screenBackgroundLightColor,
      borderWidth: 1,
      borderColor: 'rgba( 0, 0, 0, 0.2 )'
    }
  });
  
export default connect(
    ({ app }) => ({
      isAppLoading: app.isLoading,
      links: app.links,
    })
  )( PosLinkSystemScreen);