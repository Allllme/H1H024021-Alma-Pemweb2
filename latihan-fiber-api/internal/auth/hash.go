package auth

import (
	"crypto/sha256"
	"encoding/hex"
)

func HashToken(token string) string {
	ringkasan := sha256.Sum256([]byte(token))

	return hex.EncodeToString(ringkasan[:])
}