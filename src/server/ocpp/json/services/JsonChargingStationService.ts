import { OCPPAuthorizeRequest, OCPPAuthorizeResponse, OCPPBootNotificationRequest, OCPPBootNotificationResponse, OCPPDataTransferRequest, OCPPDataTransferResponse, OCPPDiagnosticsStatusNotificationRequest, OCPPDiagnosticsStatusNotificationResponse, OCPPFirmwareStatusNotificationRequest, OCPPFirmwareStatusNotificationResponse, OCPPHeartbeatRequest, OCPPHeartbeatResponse, OCPPMeterValuesRequest, OCPPMeterValuesResponse, OCPPStartTransactionRequest, OCPPStartTransactionResponse, OCPPStatusNotificationRequest, OCPPStatusNotificationResponse, OCPPStopTransactionRequest, OCPPStopTransactionResponse, OCPPVersion } from '../../../../types/ocpp/OCPPServer';

import { Command } from '../../../../types/ChargingStation';
import Logging from '../../../../utils/Logging';
import { OCPPHeader } from '../../../../types/ocpp/OCPPHeader';
import OCPPService from '../../services/OCPPService';
import OCPPUtils from '../../utils/OCPPUtils';
import global from '../../../../types/GlobalType';

const MODULE_NAME = 'JsonChargingStationService';

export default class JsonChargingStationService {
  private chargingStationService: OCPPService;

  constructor() {
    // Get the OCPP service
    this.chargingStationService = global.centralSystemJsonServer.getChargingStationService(OCPPVersion.VERSION_16);
  }

  public async handleBootNotification(headers: OCPPHeader, payload: OCPPBootNotificationRequest): Promise<OCPPBootNotificationResponse> {
    // Forward
    const result: OCPPBootNotificationResponse = await this.handle(Command.BOOT_NOTIFICATION, headers, payload);
    // Return the response
    return {
      currentTime: result.currentTime,
      status: result.status,
      interval: result.interval
    };
  }

  public async handleHeartbeat(headers: OCPPHeader, payload: OCPPHeartbeatRequest): Promise<OCPPHeartbeatResponse> {
    // Forward
    const result: OCPPHeartbeatResponse = await this.handle(Command.HEARTBEAT, headers, payload);
    // Return the response
    return {
      currentTime: result.currentTime
    };
  }

  public async handleStatusNotification(headers: OCPPHeader, payload: OCPPStatusNotificationRequest): Promise<OCPPStatusNotificationResponse> {
    // Forward
    await this.handle(Command.STATUS_NOTIFICATION, headers, payload);
    // Return the response
    return {};
  }

  public async handleMeterValues(headers: OCPPHeader, payload: OCPPMeterValuesRequest): Promise<OCPPMeterValuesResponse> {
    // Forward
    await this.handle(Command.METER_VALUES, headers, payload);
    // Return the response
    return {};
  }

  public async handleAuthorize(headers: OCPPHeader, payload: OCPPAuthorizeRequest): Promise<OCPPAuthorizeResponse> {
    // Forward
    const result: OCPPAuthorizeResponse = await this.handle(Command.AUTHORIZE, headers, payload);
    // Return the response
    return {
      idTagInfo: {
        status: result.idTagInfo.status
      }
    };
  }

  public async handleDiagnosticsStatusNotification(headers: OCPPHeader, payload: OCPPDiagnosticsStatusNotificationRequest): Promise<OCPPDiagnosticsStatusNotificationResponse> {
    // Forward
    await this.handle(Command.DIAGNOSTICS_STATUS_NOTIFICATION, headers, payload);
    // Return the response
    return {};
  }

  public async handleFirmwareStatusNotification(headers: OCPPHeader, payload: OCPPFirmwareStatusNotificationRequest): Promise<OCPPFirmwareStatusNotificationResponse> {
    // Forward
    await this.handle(Command.FIRMWARE_STATUS_NOTIFICATION, headers, payload);
    // Return the response
    return {};
  }

  public async handleStartTransaction(headers: OCPPHeader, payload: OCPPStartTransactionRequest): Promise<OCPPStartTransactionResponse> {
    // Forward
    const result: OCPPStartTransactionResponse = await this.handle(Command.START_TRANSACTION, headers, payload);
    // Return the response
    return {
      transactionId: result.transactionId,
      idTagInfo: {
        status: result.idTagInfo.status
      }
    };
  }

  public async handleDataTransfer(headers: OCPPHeader, payload: OCPPDataTransferRequest): Promise<OCPPDataTransferResponse> {
    // Forward
    const result: OCPPDataTransferResponse = await this.handle(Command.DATA_TRANSFER, headers, payload);
    // Return the response
    return {
      status: result.status
    };
  }

  public async handleStopTransaction(headers: OCPPHeader, payload: OCPPStopTransactionRequest): Promise<OCPPStopTransactionResponse> {
    // Forward
    const result: OCPPStopTransactionResponse = await this.handle(Command.STOP_TRANSACTION, headers, payload);
    // Return the response
    return {
      idTagInfo: {
        status: result.idTagInfo.status
      }
    };
  }

  private async handle(command: Command, headers: OCPPHeader, payload) {
    try {
      // Handle
      return await this.chargingStationService[`handle${command}`](headers, payload);
    } catch (error) {
      await Logging.logException(error, OCPPUtils.getServerActionFromOcppCommand(command), headers.chargeBoxIdentity, MODULE_NAME, command, headers.tenantID);
      throw error;
    }
  }
}
