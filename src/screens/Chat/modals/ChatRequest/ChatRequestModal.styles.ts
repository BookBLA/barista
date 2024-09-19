// ChatRequestModal.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // 화면 하단에 고정
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#1D2951', // 남색 배경 설정
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    height: 180,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  reportButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    color: 'white',
    fontSize: 14,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  declineButtonText: {
    color: 'white',
    fontSize: 14,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#FFEBAC',
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'black',
    fontSize: 14,
  },
});
