import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';
import { useErrorMessage } from '../../store/appStatus/errorMessage/useErrorMessage';
import { Get } from '../../configs/axios/http.api';

export const enum EUploadImageType {
  IMAGE = 'image',
  CERTIFICATION = 'certification',
  PROFILE = 'profile',
  UPDATE_CERTIFICATION = 'update-certification',
  UPDATE_PROFILE = 'update-profile',
}

const extractFileExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === fileName.length - 1) {
    return ''; // 확장자가 없거나 파일명이 ".filename" 또는 "filename."인 경우 처리
  }
  return fileName.slice(lastDotIndex + 1);
};

export const getPresignedUrl = (uploadType: EUploadImageType, memberId: number | string | number[], uri: string) => {
  return Get(`aws/s3/presigned-url/${uploadType}`, { params: { fileName: `${memberId.toString()}.jpg` } }, true);
};

const compressImage = async (imageUri: string) => {
  const manipulateResult = await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: 600 } }], {
    compress: 0.5,
    format: SaveFormat.JPEG,
  });
  return manipulateResult.uri;
};

const uriToBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  return await resp.blob();
};

const uriToBuffer = async (uri: string): Promise<Buffer> => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return Buffer.from(base64, 'base64');
};

export const uploadImageToS3 = async (imageUri: string, memberId: number | string | number[]) => {
  try {
    const compressedImageUri = await compressImage(imageUri);
    const {
      result: { presignedUrl },
    } = await getPresignedUrl(EUploadImageType.UPDATE_PROFILE, memberId, compressedImageUri);

    const fileBody = await uriToBlob(compressedImageUri);
    const fileType = fileBody.type;
    const imageBuffer = await uriToBuffer(compressedImageUri);

    await axios.put(presignedUrl, imageBuffer, {
      headers: { 'Content-Type': fileType ?? 'image/jpeg' },
    });

    return `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}/${EUploadImageType.UPDATE_PROFILE}/${memberId}.jpg`;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      useErrorMessage.getState().setErrorMessage(error.message);
    } else {
      console.error(error);
    }
  }
};

export const uploadStudentIdImageToS3 = async (imageUri: string, memberId: number | string | number[]) => {
  try {
    const {
      result: { presignedUrl },
    } = await getPresignedUrl(EUploadImageType.CERTIFICATION, memberId, imageUri);

    const fileBody = await uriToBlob(imageUri);
    const fileType = fileBody.type;
    const imageBuffer = await uriToBuffer(imageUri);

    await axios.put(presignedUrl, imageBuffer, {
      headers: { 'Content-Type': fileType ?? 'image/jpeg' },
    });

    return `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}/${EUploadImageType.CERTIFICATION}/${memberId}.jpg`;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      useErrorMessage.getState().setErrorMessage(error.message);
    } else {
      console.error(error);
    }
  }
};
