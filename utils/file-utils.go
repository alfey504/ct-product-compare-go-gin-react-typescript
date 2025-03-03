package utils

import (
	"fmt"
	"os"
)

func WriteBytesToFile(filename string, data []byte) error {
	// 1. Create the file (or overwrite if it exists)
	err := os.WriteFile(filename, data, 0644) // 0644 are the file permissions (read/write for owner, read for group and others)
	if err != nil {
		return fmt.Errorf("error writing to file: %w", err) // Wrap the error for better context
	}

	return nil
}
