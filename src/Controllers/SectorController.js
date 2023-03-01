const moment = require('moment-timezone');
const Sector = require('../Models/SectorSchema');
const { validateSector } = require('../Utils/validate');
const { handleSuccess, handleError, handleInvalidId,handleValidationError } = require('../Utils/responseHandlers');

const sectorGet = async (req, res) => {
  try {
    const sectors = await Sector.find().sort({ 'name': 1 });
    handleSuccess(res, sectors);
  } catch (error) {
    handleError(res, error);
  }
};

const sectorGetActive = async (req, res) => {
  try {
    const sectors = await Sector.find({ status: 'ativado' });
    handleSuccess(res, sectors);
  } catch (error) {
    handleError(res, error);
  }
};

const sectorId = async (req, res) => {
  const { id } = req.params;

  try {
    const sector = await Sector.findOne({ _id: id });
    handleSuccess(res, sector);
  } catch (error) {
    handleInvalidId(res);
  }
};

const sectorCreate = async (req, res) => {
  const { name, description } = req.body;

  const validFields = validateSector(name, description);
  if (validFields) return handleValidationError(res, validFields);

  try {
    const newSector = await Sector.create({
      name,
      description,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      status: 'ativado',
    });
    handleSuccess(res, newSector);
  } catch (error) {
    handleError(res, error.code);
  }
};

const sectorUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const validFields = validateSector(name, description);
  if (validFields) return handleValidationError(res, validFields);

  try {
    const updateStatus = await Sector.findOneAndUpdate({ _id: id }, {
      name,
      description,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (user) => user);
    handleSuccess(res, updateStatus);
  } catch {
    handleInvalidId(res);
  }
};

const sectorDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSector = await Sector.deleteOne({ _id: id });
    handleSuccess(res, deletedSector);
  } catch (error) {
    handleError(res, error);
  }
};

const sectorDeactivate = async (req, res) => {
  const { id } = req.params;

  try {
    const updateStatus = await Sector.findOneAndUpdate({ _id: id }, {
      status: 'desativado',
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (sector) => sector);
    handleSuccess(res, updateStatus);
  } catch {
    handleInvalidId(res);
  }
};

const newestFourSectorsGet = async (req, res) => {
  try {
    const sectors = await Sector.find().limit(4).sort({ createdAt: -1 });
    handleSuccess(res, sectors);
  }
  catch (error) {
    handleError(res, error)
  }
};

const newestFourActiveSectorsGet = async (req, res) => {
  try {
    const sectors = await Sector.find({ status: "ativado" }).limit(4).sort({ createdAt: -1 });
    handleSuccess(res, sectors);
  }
  catch (error) {
    handleError(res, error)
  }
};

module.exports = {
  sectorGet, sectorId, sectorCreate, sectorUpdate, sectorDelete, newestFourSectorsGet, sectorDeactivate, newestFourActiveSectorsGet, sectorGetActive,
};
