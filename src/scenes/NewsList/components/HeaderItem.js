import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import images from ':global/images';

class HeaderItem extends React.Component {
  getIcon = index => {
    var icon = images.iconLogo;

    switch (index) {
      case 0:
        icon = images.iconRoundGmail;
        break;
      case 1:
        icon = images.iconCart;
        break;
      case 2:
        icon = images.iconRevel;
        break;
      case 3:
        icon = images.iconDashBoard;
        break;
      case 4:
        icon = images.iconDesc;
        break;
      case 5:
        icon = images.iconInfo;
        break;
      default:
        icon = images.iconEmail;
        break;
    }

    return icon;
  };

  render() {
    const {data, index} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(data, index)}
        style={{width: 40, marginLeft: 15, marginTop: 10}}>
        <View
          style={{
            borderRadius: 30,
            width: 40,
            height: 40,
            borderWidth: 0,
            borderColor: '#F7B330',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {index == 0 ? (
            <Image
              style={{width: 40, height: 40}}
              source={images.iconRoundGmail}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={{width: 40, height: 40}}
              source={{uri: data.Icon}}
              resizeMode="contain"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default HeaderItem;
