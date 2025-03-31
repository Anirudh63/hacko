def is_valid_file_type(file_type: str, allowed_types: list) -> bool:
    return file_type in allowed_types


def is_valid_file_size(file_size: int, max_size: int) -> bool:
    return file_size <= max_size

# Example usage:
# allowed_types = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf']
# max_size = 5 * 1024 * 1024  # 5 MB 