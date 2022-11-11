package domain

const (
	FarmTypeOrganic      = "organic"
	FarmTypeHydroponic   = "hydroponic"
	FarmTypeAquaponic    = "aquaponic"
	FarmTypeMushroom     = "mushroom"
	FarmTypeLiveStock    = "livestock"
	FarmTypeFisheries    = "fisheries"
	FarmTypePermaculture = "permaculture"
)

type FarmType struct {
	Code string `json:"code"`
	Name string `json:"name"`
}

func FindAllFarmTypes() []FarmType {
	return []FarmType{
		FarmType{Code: FarmTypeOrganic, Name: "Organik / Turpoqqa asoslangan"},
		FarmType{Code: FarmTypeHydroponic, Name: "Gidroponika"},
		FarmType{Code: FarmTypeAquaponic, Name: "Akvaponik"},
		FarmType{Code: FarmTypeMushroom, Name: "Qo'ziqorin"},
		FarmType{Code: FarmTypeLiveStock, Name: "Chorvachilik"},
		FarmType{Code: FarmTypeFisheries, Name: "Baliqchilik"},
		FarmType{Code: FarmTypePermaculture, Name: "Permakultura"},
	}
}

func FindFarmTypeByCode(code string) (FarmType, error) {
	items := FindAllFarmTypes()

	for _, item := range items {
		if item.Code == code {
			return item, nil
		}
	}

	return FarmType{}, FarmError{FarmErrorInvalidFarmTypeCode}
}
