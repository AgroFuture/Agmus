package domain

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFindAllFarmTypes(t *testing.T) {
	types := []FarmType{
		FarmType{Code: "organic", Name: "Organik / Tuproqqa asoslangan"},
		FarmType{Code: "hydroponic", Name: "Gidroponik"},
		FarmType{Code: "aquaponic", Name: "Akvaponik"},
		FarmType{Code: "mushroom", Name: "Qo'ziqorin"},
		FarmType{Code: "livestock", Name: "Chorvachilik"},
		FarmType{Code: "fisheries", Name: "Baliqchilik"},
		FarmType{Code: "permaculture", Name: "Permakultura"},
	}

	farmTypes := FindAllFarmTypes()

	assert.Equal(t, types, farmTypes)
}

func TestFindFarmTypeByCode(t *testing.T) {
	// Given
	farmType := FarmType{Code: "organic", Name: "Organik / Tuproqqa asoslangan"}

	result, err := FindFarmTypeByCode(farmType.Code)

	assert.Nil(t, err)
	assert.Equal(t, farmType, result)
}

func TestInvalidFindFarmTypeByCode(t *testing.T) {
	code := "er"

	_, err := FindFarmTypeByCode(code)

	assert.Equal(t, FarmError{FarmErrorInvalidFarmTypeCode}, err)
}
