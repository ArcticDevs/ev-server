import { ChargingRateUnitType, ChargingSchedule, Profile } from '../../types/ChargingProfile';

import { OCPPDataTransferStatus } from './OCPPServer';
import { OcppParameter } from '../ChargingStation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OCPPCommandParam {
}

export interface OCPPResetCommandParam extends OCPPCommandParam {
  type: OCPPResetType;
}

export interface OCPPResetCommandResult {
  status: OCPPResetStatus;
}

export enum OCPPStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export enum OCPPResetStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export enum OCPPResetType {
  HARD = 'Hard',
  SOFT = 'Soft'
}

export interface OCPPClearCacheCommandResult {
  status: OCPPClearCacheStatus;
}

export enum OCPPClearCacheStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export interface OCPPDataTransferCommandParam extends OCPPCommandParam {
  vendorId: string,
  messageId?: string,
  data: string
}

export interface OCPPDataTransferCommandResult {
  status: OCPPDataTransferStatus
}

export interface OCPPGetConfigurationCommandParam extends OCPPCommandParam {
  key?: string[];
}

export interface OCPPGetConfigurationCommandResult {
  configurationKey: OcppParameter[];
  unknownKey?: string[];
}

export interface OCPPChangeConfigurationCommandParam extends OCPPCommandParam {
  key: string;
  value: string;
}

export interface OCPPChangeConfigurationCommandResult {
  status: OCPPConfigurationStatus;
}

export interface OCPPCustomConfigurationParam extends OCPPChangeConfigurationCommandParam {
  custom: boolean;
}

export enum OCPPConfigurationStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  REBOOT_REQUIRED = 'RebootRequired',
  NOT_SUPPORTED = 'NotSupported'
}

export interface OCPPRemoteStartTransactionCommandParam extends OCPPCommandParam {
  connectorId: number;
  idTag: string;
  chargingProfile?: Profile;
}

export interface OCPPRemoteStartTransactionCommandResult {
  status: OCPPRemoteStartStopStatus;
}

export interface OCPPRemoteStopTransactionCommandParam extends OCPPCommandParam {
  transactionId: number;
}

export interface OCPPRemoteStopTransactionCommandResult {
  status: OCPPRemoteStartStopStatus;
}

export enum OCPPRemoteStartStopStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export interface OCPPUnlockConnectorCommandParam extends OCPPCommandParam {
  connectorId: number;
}

export interface OCPPUnlockConnectorCommandResult {
  status: OCPPUnlockStatus;
}

export enum OCPPUnlockStatus {
  UNLOCKED = 'Unlocked',
  UNLOCK_FAILED = 'UnlockFailed',
  NOT_SUPPORTED = 'NotSupported'
}

export interface OCPPSetChargingProfileCommandParam extends OCPPCommandParam {
  connectorId: number;
  csChargingProfiles?: Profile;
}

export interface OCPPSetChargingProfileCommandResult {
  status: OCPPChargingProfileStatus;
}

export enum OCPPChargingProfileStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  NOT_SUPPORTED = 'NotSupported'
}

export interface OCPPGetCompositeScheduleCommandParam extends OCPPCommandParam {
  connectorId: number;
  duration: number;
  chargingRateUnit?: ChargingRateUnitType;
}

export interface OCPPGetCompositeScheduleCommandResult {
  status: OCPPGetCompositeScheduleStatus;
  connectorId?: number;
  scheduleStart?: Date;
  chargingSchedule?: ChargingSchedule;
}

export enum OCPPGetCompositeScheduleStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export interface OCPPClearChargingProfileCommandParam extends OCPPCommandParam {
  id?: number;
  connectorId?: number;
  chargingProfilePurpose?: OCPPChargingProfilePurposeType;
  stackLevel?: number;
}

export interface OCPPClearChargingProfileCommandResult {
  status: OCPPClearChargingProfileStatus;
}

export enum OCPPClearChargingProfileStatus {
  ACCEPTED = 'Accepted',
  UNKNOWN = 'Unknown'
}

export enum OCPPChargingProfilePurposeType {
  CHARGE_POINT_MAX_PROFILE = 'ChargePointMaxProfile',
  TX_DEFAULT_PROFILE = 'TxDefaultProfile',
  TX_PROFILE = 'TxProfile'
}

export interface OCPPChangeAvailabilityCommandParam extends OCPPCommandParam {
  connectorId: number;
  type: OCPPAvailabilityType;
}

export interface OCPPChangeAvailabilityCommandResult {
  status: OCPPAvailabilityStatus;
}

export enum OCPPAvailabilityType {
  INOPERATIVE = 'Inoperative',
  OPERATIVE = 'Operative'
}

export enum OCPPAvailabilityStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  SCHEDULED = 'Scheduled'
}

export interface OCPPGetDiagnosticsCommandParam extends OCPPCommandParam {
  location: string;
  retries?: number;
  retryInterval?: number;
  startTime?: Date;
  stopTime?: Date;
}

export interface OCPPGetDiagnosticsCommandResult {
  fileName?: string;
}

export interface OCPPUpdateFirmwareCommandParam extends OCPPCommandParam {
  location: string;
  retries?: number;
  retrieveDate: Date;
  retryInterval?: number;
}

export interface OCPPReserveNowCommandParam extends OCPPCommandParam {
  connectorId: string;
  expiryDate: Date;
  idTag: string;
  parentIdTag?: string;
  reservationId: number;
}

export enum OCPPReserveNowStatus {
  ACCEPTED = 'Accepted',
  FAULTED = 'Faulted',
  OCCUPIED = 'Occupied',
  REJECTED = 'Rejected',
  UNAVAILABLE = 'Unavailable'
}

export interface OCPPReserveNowCommandResult {
  status: OCPPReserveNowStatus;
}

export interface OCPPCancelReservationCommandParam extends OCPPCommandParam {
  reservationId: number;
}

export enum OCPPCancelReservationStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export interface OCPPCancelReservationCommandResult {
  status: OCPPCancelReservationStatus;
}
