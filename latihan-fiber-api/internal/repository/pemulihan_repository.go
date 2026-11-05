package repository

import (
	"latihan-fiber-api/internal/config"
	"latihan-fiber-api/internal/model"
)

func AmbilTerhapusPerId(id uint) (model.Mahasiswa, error) {
	var mahasiswa model.Mahasiswa

	err := config.DB.Unscoped().
		Where("deleted_at IS NOT NULL").
		First(&mahasiswa, id).Error

	return mahasiswa, err
}

func Pulihkan(mahasiswa *model.Mahasiswa) error {
	return config.DB.Unscoped().Model(mahasiswa).Update("deleted_at", nil).Error
}