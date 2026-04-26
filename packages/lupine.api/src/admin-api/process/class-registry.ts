/**
 * Class Registry — maps class name strings to constructors.
 */

import { ProcessBase } from './process-base';

type ProcessClassConstructor = new () => ProcessBase;
const registry = new Map<string, ProcessClassConstructor>();

export function registerClass(name: string, cls: ProcessClassConstructor): void {
  registry.set(name, cls);
}

export function createClass(name: string): ProcessBase {
  const Cls = registry.get(name);
  if (!Cls) {
    throw new Error(`Process class not registered: "${name}". Call registerClass() first.`);
  }
  return new Cls();
}

export function hasClass(name: string): boolean {
  return registry.has(name);
}

export function getAllRegisteredClasses(): string[] {
  return Array.from(registry.keys()).sort();
}

export function getClassConstructor(name: string): ProcessClassConstructor | undefined {
  return registry.get(name);
}

// ---------------------------------------------------------------------------
// Register all classes
// ---------------------------------------------------------------------------
import { AccessLevelSetLessCurrent } from './classes/AccessLevelSetLessCurrent';
registerClass('AccessLevelSetLessCurrent', AccessLevelSetLessCurrent as any);
import { AddError } from './classes/AddError';
registerClass('AddError', AddError as any);
import { AddList } from './classes/AddList';
registerClass('AddList', AddList as any);
import { AddRemoveList } from './classes/AddRemoveList';
registerClass('AddRemoveList', AddRemoveList as any);
import { AutoAccessLevel } from './classes/AutoAccessLevel';
registerClass('AutoAccessLevel', AutoAccessLevel as any);
import { CallProcess } from './classes/CallProcess';
registerClass('CallProcess', CallProcess as any);
import { CheckDateExist } from './classes/CheckDateExist';
registerClass('CheckDateExist', CheckDateExist as any);
import { CheckDateFormat } from './classes/CheckDateFormat';
registerClass('CheckDateFormat', CheckDateFormat as any);
import { CheckId } from './classes/CheckId';
registerClass('CheckId', CheckId as any);
import { CheckIntGreaterOrEqual0 } from './classes/CheckIntGreaterOrEqual0';
registerClass('CheckIntGreaterOrEqual0', CheckIntGreaterOrEqual0 as any);
import { CheckIntGreaterThan0 } from './classes/CheckIntGreaterThan0';
registerClass('CheckIntGreaterThan0', CheckIntGreaterThan0 as any);
import { CheckIntLessOrEqual0 } from './classes/CheckIntLessOrEqual0';
registerClass('CheckIntLessOrEqual0', CheckIntLessOrEqual0 as any);
import { CheckIntLessThan0 } from './classes/CheckIntLessThan0';
registerClass('CheckIntLessThan0', CheckIntLessThan0 as any);
import { CheckListDuplicate } from './classes/CheckListDuplicate';
registerClass('CheckListDuplicate', CheckListDuplicate as any);
import { CheckMailAddress } from './classes/CheckMailAddress';
registerClass('CheckMailAddress', CheckMailAddress as any);
import { CheckMustBlank } from './classes/CheckMustBlank';
registerClass('CheckMustBlank', CheckMustBlank as any);
import { CheckMustLogin } from './classes/CheckMustLogin';
registerClass('CheckMustLogin', CheckMustLogin as any);
import { CheckNotBlank } from './classes/CheckNotBlank';
registerClass('CheckNotBlank', CheckNotBlank as any);
import { CheckRange } from './classes/CheckRange';
registerClass('CheckRange', CheckRange as any);
import { CheckRecordExistAuto } from './classes/CheckRecordExistAuto';
registerClass('CheckRecordExistAuto', CheckRecordExistAuto as any);
import { CheckRecordExistIfUpdate } from './classes/CheckRecordExistIfUpdate';
registerClass('CheckRecordExistIfUpdate', CheckRecordExistIfUpdate as any);
import { CheckRecordMustExist } from './classes/CheckRecordMustExist';
registerClass('CheckRecordMustExist', CheckRecordMustExist as any);
import { CheckRecordNotExist } from './classes/CheckRecordNotExist';
registerClass('CheckRecordNotExist', CheckRecordNotExist as any);
import { CheckTableId } from './classes/CheckTableId';
registerClass('CheckTableId', CheckTableId as any);
import { CheckTime } from './classes/CheckTime';
registerClass('CheckTime', CheckTime as any);
import { CleanEntity } from './classes/CleanEntity';
registerClass('CleanEntity', CleanEntity as any);
import { ClearCache } from './classes/ClearCache';
registerClass('ClearCache', ClearCache as any);
import { CopyEntity } from './classes/CopyEntity';
registerClass('CopyEntity', CopyEntity as any);
import { CopyItemForce } from './classes/CopyItemForce';
registerClass('CopyItemForce', CopyItemForce as any);
import { CopyItemIfDestBlank } from './classes/CopyItemIfDestBlank';
registerClass('CopyItemIfDestBlank', CopyItemIfDestBlank as any);
import { CopyItemIfFromNotBlank } from './classes/CopyItemIfFromNotBlank';
registerClass('CopyItemIfFromNotBlank', CopyItemIfFromNotBlank as any);
import { CopyList } from './classes/CopyList';
registerClass('CopyList', CopyList as any);
import { CopyShortStringIfDestBlank } from './classes/CopyShortStringIfDestBlank';
registerClass('CopyShortStringIfDestBlank', CopyShortStringIfDestBlank as any);
import { CountRecord } from './classes/CountRecord';
registerClass('CountRecord', CountRecord as any);
import { CSVExport } from './classes/CSVExport';
registerClass('CSVExport', CSVExport as any);
import { DateTimeToSave } from './classes/DateTimeToSave';
registerClass('DateTimeToSave', DateTimeToSave as any);
import { DateTimeToShow } from './classes/DateTimeToShow';
registerClass('DateTimeToShow', DateTimeToShow as any);
import { DeleteEntity } from './classes/DeleteEntity';
registerClass('DeleteEntity', DeleteEntity as any);
import { DeleteRecord } from './classes/DeleteRecord';
registerClass('DeleteRecord', DeleteRecord as any);
import { DownloadData } from './classes/DownloadData';
registerClass('DownloadData', DownloadData as any);
import { GetAutoNo } from './classes/GetAutoNo';
registerClass('GetAutoNo', GetAutoNo as any);
import { GetDefaultLang } from './classes/GetDefaultLang';
registerClass('GetDefaultLang', GetDefaultLang as any);
import { GetGlobalsValue } from './classes/GetGlobalsValue';
registerClass('GetGlobalsValue', GetGlobalsValue as any);
import { GetItemInfo } from './classes/GetItemInfo';
registerClass('GetItemInfo', GetItemInfo as any);
import { GetItemName } from './classes/GetItemName';
registerClass('GetItemName', GetItemName as any);
import { GetItemOptName } from './classes/GetItemOptName';
registerClass('GetItemOptName', GetItemOptName as any);
import { GetSessionValue } from './classes/GetSessionValue';
registerClass('GetSessionValue', GetSessionValue as any);
import { GetTableItemName } from './classes/GetTableItemName';
registerClass('GetTableItemName', GetTableItemName as any);
import { Initialize } from './classes/Initialize';
registerClass('Initialize', Initialize as any);
import { InitializeEntity } from './classes/InitializeEntity';
registerClass('InitializeEntity', InitializeEntity as any);
import { InitializeList } from './classes/InitializeList';
registerClass('InitializeList', InitializeList as any);
import { InsertEntity } from './classes/InsertEntity';
registerClass('InsertEntity', InsertEntity as any);
import { InsertRecord } from './classes/InsertRecord';
registerClass('InsertRecord', InsertRecord as any);
import { InsOrUpdEntityAuto } from './classes/InsOrUpdEntityAuto';
registerClass('InsOrUpdEntityAuto', InsOrUpdEntityAuto as any);
import { LoadCurUser } from './classes/LoadCurUser';
registerClass('LoadCurUser', LoadCurUser as any);
import { LoadEntity } from './classes/LoadEntity';
registerClass('LoadEntity', LoadEntity as any);
import { MandatoryCheck } from './classes/MandatoryCheck';
registerClass('MandatoryCheck', MandatoryCheck as any);
import { NumberPlus } from './classes/NumberPlus';
registerClass('NumberPlus', NumberPlus as any);
import { RandomString } from './classes/RandomString';
registerClass('RandomString', RandomString as any);
import { RemoveList } from './classes/RemoveList';
registerClass('RemoveList', RemoveList as any);
import { SelectAllRecord } from './classes/SelectAllRecord';
registerClass('SelectAllRecord', SelectAllRecord as any);
import { SelectOneRecord } from './classes/SelectOneRecord';
registerClass('SelectOneRecord', SelectOneRecord as any);
import { SelectRecord } from './classes/SelectRecord';
registerClass('SelectRecord', SelectRecord as any);
import { SelectRecordBase } from './classes/SelectRecordBase';
registerClass('SelectRecordBase', SelectRecordBase as any);
import { SendMail } from './classes/SendMail';
registerClass('SendMail', SendMail as any);
import { SessionUserInfo } from './classes/SessionUserInfo';
registerClass('SessionUserInfo', SessionUserInfo as any);
import { Set01Blank } from './classes/Set01Blank';
registerClass('Set01Blank', Set01Blank as any);
import { SetDate } from './classes/SetDate';
registerClass('SetDate', SetDate as any);
import { SetFreeDate } from './classes/SetFreeDate';
registerClass('SetFreeDate', SetFreeDate as any);
import { SetGlobalsValue } from './classes/SetGlobalsValue';
registerClass('SetGlobalsValue', SetGlobalsValue as any);
import { SetListIndex } from './classes/SetListIndex';
registerClass('SetListIndex', SetListIndex as any);
import { SetMessage } from './classes/SetMessage';
registerClass('SetMessage', SetMessage as any);
import { SetMonthFirstDate } from './classes/SetMonthFirstDate';
registerClass('SetMonthFirstDate', SetMonthFirstDate as any);
import { SetMonthLastDate } from './classes/SetMonthLastDate';
registerClass('SetMonthLastDate', SetMonthLastDate as any);
import { SetSessionId } from './classes/SetSessionId';
registerClass('SetSessionId', SetSessionId as any);
import { SetTime } from './classes/SetTime';
registerClass('SetTime', SetTime as any);
import { SetTimestamp } from './classes/SetTimestamp';
registerClass('SetTimestamp', SetTimestamp as any);
import { SqlBase } from './classes/SqlBase';
registerClass('SqlBase', SqlBase as any);
import { StringPlus } from './classes/StringPlus';
registerClass('StringPlus', StringPlus as any);
import { StringReplace } from './classes/StringReplace';
registerClass('StringReplace', StringReplace as any);
import { StringSubstr } from './classes/StringSubstr';
registerClass('StringSubstr', StringSubstr as any);
import { StringToLower } from './classes/StringToLower';
registerClass('StringToLower', StringToLower as any);
import { StringToShort } from './classes/StringToShort';
registerClass('StringToShort', StringToShort as any);
import { StringToUpper } from './classes/StringToUpper';
registerClass('StringToUpper', StringToUpper as any);
import { StringTrim } from './classes/StringTrim';
registerClass('StringTrim', StringTrim as any);
import { S_CheckCidAccesslevel } from './classes/S_CheckCidAccesslevel';
registerClass('S_CheckCidAccesslevel', S_CheckCidAccesslevel as any);
import { S_CheckCidMustNoSub } from './classes/S_CheckCidMustNoSub';
registerClass('S_CheckCidMustNoSub', S_CheckCidMustNoSub as any);
import { S_CheckNewCid } from './classes/S_CheckNewCid';
registerClass('S_CheckNewCid', S_CheckNewCid as any);
import { S_CheckOrSetCid } from './classes/S_CheckOrSetCid';
registerClass('S_CheckOrSetCid', S_CheckOrSetCid as any);
import { S_CheckTableId } from './classes/S_CheckTableId';
registerClass('S_CheckTableId', S_CheckTableId as any);
import { S_ChgPassword } from './classes/S_ChgPassword';
registerClass('S_ChgPassword', S_ChgPassword as any);
import { S_ChgPwTips } from './classes/S_ChgPwTips';
registerClass('S_ChgPwTips', S_ChgPwTips as any);
import { S_CidContCount } from './classes/S_CidContCount';
registerClass('S_CidContCount', S_CidContCount as any);
import { S_CidGetName } from './classes/S_CidGetName';
registerClass('S_CidGetName', S_CidGetName as any);
import { S_FaqgroupDelete } from './classes/S_FaqgroupDelete';
registerClass('S_FaqgroupDelete', S_FaqgroupDelete as any);
import { S_ForumgroupDelete } from './classes/S_ForumgroupDelete';
registerClass('S_ForumgroupDelete', S_ForumgroupDelete as any);
import { S_SelectUser } from './classes/S_SelectUser';
registerClass('S_SelectUser', S_SelectUser as any);
import { S_SendContactMail } from './classes/S_SendContactMail';
registerClass('S_SendContactMail', S_SendContactMail as any);
import { S_UploadSave } from './classes/S_UploadSave';
registerClass('S_UploadSave', S_UploadSave as any);
import { UpdateEntity } from './classes/UpdateEntity';
registerClass('UpdateEntity', UpdateEntity as any);
import { UpdateEntityHits } from './classes/UpdateEntityHits';
registerClass('UpdateEntityHits', UpdateEntityHits as any);
import { UpdateRecord } from './classes/UpdateRecord';
registerClass('UpdateRecord', UpdateRecord as any);
