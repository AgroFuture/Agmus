package domain

// UserError is a custom error from Go built-in error
type UserError struct {
	Code int
}

const (
	UserErrorUsernameEmptyCode = iota
	UserErrorInvalidUsernameLengthCode
	UserErrorPasswordEmptyCode
	UserErrorWrongPasswordCode
	UserErrorUsernameExistsCode
	UserErrorPasswordConfirmationNotMatchCode
	UserChangePasswordErrorWrongOldPasswordCode
)

func (e UserError) Error() string {
	switch e.Code {
	case UserErrorUsernameEmptyCode:
		return "Foydalanuvchi nomi bo'sh bo'lmasligi kerak"
	case UserErrorInvalidUsernameLengthCode:
		return "Foydalanuvchi nomi juda qisqa"
	case UserErrorPasswordEmptyCode:
		return "Parol bo'sh bo'lmasligi kerak"
	case UserErrorWrongPasswordCode:
		return "Notog'ri parol"
	case UserErrorUsernameExistsCode:
		return "Foydalanuvchi nomi allaqachon foydalanilgan"
	case UserErrorPasswordConfirmationNotMatchCode:
		return "Parolni tasdiqlash mos kelmadi"
	case UserChangePasswordErrorWrongOldPasswordCode:
		return "Eski parol yaroqsiz"
	default:
		return "Noma'lum foydalanuvchi xato kodi"
	}
}
