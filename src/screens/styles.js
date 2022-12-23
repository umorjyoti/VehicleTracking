import React from 'react';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  //SplashScreen
  splashScreen: {
    height: hp(20),
    width: wp(70),
    alignSelf: 'center',
  },
  //Home Page Styles
  searchBar: {
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: wp(4),
    height: hp(5),
    marginBottom: hp(2),
    borderRadius: 15,
    paddingHorizontal: wp(2),
    alignItems: 'center',
  },
  searchIcon: {height: hp(3), width: hp(3), marginRight: wp(2)},
  searchText: {fontSize: hp(2.2), color: '#000000', borderWidth: 1},
  homePageContainer: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  homeLoading: {
    height: hp(20),
    width: hp(20),
    alignSelf: 'center',
  },
  header: {
    color: '#000000',
    fontSize: hp(3),
    fontWeight: '800',
    alignSelf: 'center',
    paddingVertical: hp(2),
  },
  flatlist: {
    paddingHorizontal: hp(2),
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 8,
    marginBottom: hp(4),
    flex: 1,
    borderRadius: 15,
  },
  subContainer: {
    height: hp(14),
    margin: wp(1),
    justifyContent: 'flex-end',
  },
  regNo: {
    alignSelf: 'center',
    fontSize: hp(2),
    fontWeight: '500',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    marginBottom: hp(0.2),
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 4,
  },
  vehicleType: {
    alignSelf: 'center',
    paddingTop: hp(1),
    paddingBottom: hp(2),
    color: '#000000',
    fontSize: hp(2),
    fontWeight: '500',
  },
  moreButton: {
    position: 'absolute',
    top: hp(19),
    alignSelf: 'center',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(5),
    backgroundColor: '#7a61d4',
    borderRadius: 10,
  },
  moreButtonText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: hp(2),
  },
  //Vehicle Detail Page
  detailPageContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  //LoginPage
  errorMessage: {
    color: 'white',
    fontSize: hp(2.2),
    backgroundColor: 'rgba(255,0,0,0.4)',
    paddingVertical: hp(0.3),
    paddingHorizontal: wp(4),
    borderRadius: 10,
  },
  loginPageContainer: {
    flex: 1,
    backgroundColor: '#576cd6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameContainer: {
    width: wp(80),
    backgroundColor: 'white',
    height: hp(6),
    paddingHorizontal: wp(4),
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  loginIcon: {
    height: hp(3),
    width: hp(3),
    marginRight: hp(1),
  },
  username: {
    maxWidth: wp(62),
    color: '#000000',
  },
  rememberMe: {
    alignSelf: 'center',
    width: wp(80),
    height: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(1),
  },
  checkbox: {
    height: hp(2.5),
    width: hp(2.5),
    backgroundColor: '#FFFFFF',
    marginRight: hp(1),
  },
  checkMark: {
    height: hp(2.5),
    width: hp(2.5),
    alignSelf: 'center',
  },
  rememberMeText: {
    fontSize: hp(1.9),
    color: '#FFFFFF',
    fontWeight: '400',
  },
  submitButton: {
    width: wp(80),
    height: hp(6),
    alignItems: 'center',
    paddingVertical: hp(1),
    marginTop: hp(1),
    borderRadius: 10,
    backgroundColor: '#2a3b5d',
  },
  submitButonText: {
    fontSize: hp(2.3),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  welcome: {
    fontSize: hp(2.8),
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: hp(2),
    letterSpacing: 2,
  },
  loginLoading: {
    width: wp(20),
    height: hp(13),
    alignSelf: 'center',
    top: hp(-2.2),
  },
});

export default styles;
