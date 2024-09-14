// ChatDetail.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileSchool: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  profileDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  libraryButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  libraryButtonText: {
    fontSize: 14,
    color: '#007aff',
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 10,
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageUsername: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 10,
    color: '#999999',
  },
  loadingIndicator: {
    margin: 20,
  },
  scrollToBottomButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
});

export default styles;
