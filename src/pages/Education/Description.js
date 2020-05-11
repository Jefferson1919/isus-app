import * as React from 'react';

import {
  // eslint-disable-next-line no-unused-vars
  View, Image, Dimensions, StyleSheet, Text, Share, TouchableOpacity
}
  from 'react-native';
import { Title } from 'react-native-paper';
import HTML from 'react-native-render-html';
import Shared from '../../assets/images/Share.png';

export default function DescriptionScreen(props) {
  console.tron.log(props);
  const { route } = props;
  const { item } = route.params;

  const onShare = async () => {
    const messagTitle = item.post_title;
    const messagLink = ' -iSUS: https://coronavirus.ceara.gov.br/project/'.concat(item.slug);
    try {
      const result = await Share.share({
        message: messagTitle + messagLink
      },
      {
        // mostra se o usuário compartilhou ou não a caixa de diálogo
        dialogTitle: 'Compartilhado Hoje',
        excludedActivityTypes: [
          'com.apple.mobilenotes.SharingExtension',
          'com.apple.reminders.RemindersEditorExtension'
        ]
      });

      if (result.action === Share.sharedAction) {
        console.log(item);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.titleDetail}>
        <Title>{item.post_title}</Title>
      </View>
      <View style={styles.sub}>
        <View style={styles.subText}>
          <Text> Postado em 23 de Abril de 2020</Text>
        </View>
        <View style={styles.subShare}>
        <TouchableOpacity onPress={onShare}>
          <Image source={Shared} />
        </TouchableOpacity>
        </View>
      </View>
      <Image
        resizeMode="contain"
        style={{
          height: Dimensions.get('window').width / 1.5,
          width: Dimensions.get('window').width
        }}
        source={{ uri: `${item.image}` }}
      />
      <View
        style={{
          // height: Dimensions.get('window').width / 1.5,
          width: Dimensions.get('window').width
        }}
      >
          <View style={{
            padding: 10,
            alignContent: 'center'
          }}
          >
            <HTML html={item.content} />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#333333'
  },
  titleDetail: {
    marginTop: 32,
    marginLeft: 18,
    marginRight: 16,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: 28,
    color: '#666666'
  },
  sub: {
    flexDirection: 'row',
    margin: 1,
    justifyContent: 'space-between',
    marginTop: 12
  },
  subText: {
    marginLeft: 18,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#666666'
  },
  subShare: {
    marginRight: 20,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#EEEEEE'
  }
});
