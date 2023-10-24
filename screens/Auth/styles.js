import { StyleSheet } from "react-native";
import { colors, FontFamily } from "../../constants/globalThemeConstants";

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "flex-end",
    fontFamily: FontFamily.robotoRegular,
  },

  imageFormWrap: {
    position: "relative",
    top: 0,
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -92 }],
    height: 60,
    width: 120,
  },
  imageForm: {
    width: 120,
    height: 120,
    backgroundColor: colors.ligthGray,
    borderRadius: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  keyboardAvoidingView: {
    backgroundColor: colors.white,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  submitButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: "100%",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 80,

    backgroundColor: colors.white,
    alignItems: "center",
    rowGap: 16,
  },
  formWrap: {
    marginBottom: 43,
    rowGap: 16,
  },
  styledInput: {
    height: 50,
    padding: 16,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderStyle: "solid",
    backgroundColor: colors.ligthGray,
    color: colors.textColor,
  },
  informText: {
    color: colors.darkBlue,
    fontSize: 16,
  },
  actionText: {
    textDecorationLine: "underline",
  },

  showBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showBtnTitle: {
    fontSize: 16,
    color: colors.darkBlue,
  },
  iconImageWrap: {
    borderRadius: "50%",
    overflow: "hidden",
    position: "absolute",
    top: 80,
    width: 25,
    height: 25,

    right: -12.5,
  },
});
