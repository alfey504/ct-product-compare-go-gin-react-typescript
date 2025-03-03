package utils

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func LoadEnv(filePath string, testVariable string) error {
	file, err := os.Open(filePath)
	if os.IsExist(err) {
		_, ok := os.LookupEnv(testVariable)
		if !ok {
			return fmt.Errorf("failed to load file")
		}
		return nil
	} else if err != nil {
		return err
	}

	scanner := bufio.NewScanner(file)
	lineCount := 0
	for scanner.Scan() {
		lineCount++
		line := strings.TrimSpace(scanner.Text())

		if len(line) == 0 || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			return fmt.Errorf("failed to parse line in .env file at line : %d", lineCount)
		}

		key := strings.Trim(parts[0], `"' `)
		val := strings.Trim(parts[1], `"' `)

		os.Setenv(key, val)
	}
	return scanner.Err()
}
