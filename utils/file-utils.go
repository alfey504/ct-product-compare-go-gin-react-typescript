package utils

import (
	"fmt"
	"os"
	"time"
)

func WriteBytesToFile(filename string, data []byte) error {
	// 1. Create the file (or overwrite if it exists)
	err := os.WriteFile(filename, data, 0644) // 0644 are the file permissions (read/write for owner, read for group and others)
	if err != nil {
		return fmt.Errorf("error writing to file: %w", err) // Wrap the error for better context
	}

	return nil
}

func LogToFile(name string, data []byte) {
	fileName := "logs/" + name + "_" + time.Now().String()

	file, err := os.Create(fileName)
	if err != nil {
		fmt.Printf("logging error : %s", err.Error())
		return
	}
	_, err = file.Write(data)
	if err != nil {
		fmt.Printf("logging error : %s", err.Error())
	}

}

func LogJSONFile(name string, data []byte) {
	fileName := "logs/" + name + "_" + time.Now().String() + ".json"

	file, err := os.Create(fileName)
	if err != nil {
		fmt.Printf("logging error : %s", err.Error())
		return
	}
	_, err = file.Write(data)
	if err != nil {
		fmt.Printf("logging error : %s", err.Error())
	}

}
